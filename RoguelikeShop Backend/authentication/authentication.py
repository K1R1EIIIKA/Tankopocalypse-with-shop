import jwt
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed

from authentication.models import User


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        print(request.COOKIES)

        if not token:
            return None

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Сессия истекла, войдите снова')

        user = User.objects.filter(id=payload['id']).first()

        if user is None:
            raise AuthenticationFailed('Пользователь не найден')

        return user, None
