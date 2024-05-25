import jwt
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from authentication.models import User


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        print(request.COOKIES)

        if not token:
            return None
        if ',jwt=' in token:
            token = token.split(',jwt=')[0]
        print(token)

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            self._delete_invalid_token_response(request)
            raise AuthenticationFailed('Сессия истекла')
        except jwt.InvalidTokenError:
            self._delete_invalid_token_response(request)
            raise AuthenticationFailed('Невалидный токен')

        user = User.objects.filter(id=payload['id']).first()

        if user is None:
            raise AuthenticationFailed('Пользователь не найден')

        return user, None

    def _delete_invalid_token_response(self, request):
        response = Response({'error': 'Invalid token'}, status=401)
        response.delete_cookie('jwt')
        response.delete_cookie('refresh_jwt')
        return response
