from django import urls

from account.views import UserItemListAPIView, UserInfoListAPIView

urlpatterns = [
    urls.path('user-info/', UserInfoListAPIView.as_view(), name='user-info-list'),
    urls.path('user-item/', UserItemListAPIView.as_view(), name='user-item-list'),
]
