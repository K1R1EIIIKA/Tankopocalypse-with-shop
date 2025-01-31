from datetime import datetime, timedelta

import jwt
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from account.models import UserInfo, Role
from authentication.models import User
from authentication.serializers import UserSerializer
from shop.models import Cart


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        cart = Cart.objects.create(user=serializer.instance)
        cart.save()

        user_info = UserInfo.objects.create(user=serializer.instance)
        role = Role.objects.get(name='Cringe')
        user_info.role = role
        user_info.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


def remove_invisible_characters(text):
    return ''.join(char for char in text if char.isprintable())


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        email = remove_invisible_characters(email)
        password = remove_invisible_characters(password)
        print(email, password, 12345)

        user = User.objects.filter(email=email).first()
        print(user)

        if user is None:
            raise AuthenticationFailed('Пользователь не найден')

        print(password)
        if not user.check_password(password):
            print(1111111)
            raise AuthenticationFailed('Неверный пароль')

        print(2222222)
        access_token_payload = {
            'id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=3600 * 24),
            'iat': datetime.utcnow()
        }

        refresh_token_payload = {
            'id': user.id,
            'exp': datetime.utcnow() + timedelta(seconds=3600 * 24),
            'iat': datetime.utcnow()
        }

        access_token = jwt.encode(access_token_payload, 'secret', algorithm='HS256')
        refresh_token = jwt.encode(refresh_token_payload, 'refresh_secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=access_token, httponly=True)
        response.set_cookie(key='refresh_jwt', value=refresh_token, httponly=True)
        response.data = {
            'jwt': access_token,
            'refresh_jwt': refresh_token
        }

        return response


class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.data['refresh_jwt']

        if not refresh_token or refresh_token == 'undefined':
            raise AuthenticationFailed('Не авторизован')

        try:
            payload = jwt.decode(refresh_token, 'refresh_secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Рефреш токен истек')

        access_token_payload = {
            'id': payload['id'],
            'exp': datetime.utcnow() + timedelta(seconds=3600),
            'iat': datetime.utcnow()
        }

        new_access_token = jwt.encode(access_token_payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=new_access_token, httponly=True)
        response.data = {
            'jwt': new_access_token
        }

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Не авторизован')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Сессия истекла')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()

        if not request.COOKIES.get('jwt') or not request.COOKIES.get('refresh_jwt'):
            raise AuthenticationFailed('Не авторизован')

        response.delete_cookie('jwt')
        response.delete_cookie('refresh_jwt')

        response.data = {
            'message': 'Успешный выход'
        }

        return response
