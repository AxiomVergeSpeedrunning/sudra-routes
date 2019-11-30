class IpMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'X-Forwarded-For' in request.headers:
            request.META['REMOTE_ADDR'] = request.headers['X-Forwarded-For'].split(',')[0].strip()

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
