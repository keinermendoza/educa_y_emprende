from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param

class PagPageNumberPaginationExtraParams(PageNumberPagination):

    def get_next_link(self):
        """returns relative next page without domain"""
        if not self.page.has_next():
            return None
        url = self.request.get_full_path()
        page_number = self.page.next_page_number()
        print(self.page.number)


        return replace_query_param(url, self.page_query_param, page_number)

    def get_previous_link(self):
        """returns relative previous page without domain"""
        if not self.page.has_previous():
            return None
        url = self.request.get_full_path()
        page_number = self.page.previous_page_number()

        if page_number == 1:
            return remove_query_param(url, self.page_query_param)
        return replace_query_param(url, self.page_query_param, page_number)
    
    def get_next_page_number_custom(self):
        if not self.page.has_next():
            return None
        return self.page.next_page_number()
    
    def get_previous_page_number_custom(self):
        if not self.page.has_previous():
            return None
        return self.page.previous_page_number()
    
    def get_paginated_response(self, data, **kwargs):
        return Response({
            'count': self.page.paginator.count,
            'current_page_number': self.page.number,
            'next_page_number': self.get_next_page_number_custom(),
            'previous_page_number': self.get_previous_page_number_custom(),

            # 'next': self.get_next_link(),
            # 'previous': self.get_previous_link(),
            'results': data,
            'extra':{ **kwargs}
        })