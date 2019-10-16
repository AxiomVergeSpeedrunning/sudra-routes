from python:3

RUN mkdir /code
WORKDIR /code
ADD requirements.txt requirements.dev.txt /code/
RUN pip install -r requirements.dev.txt

CMD ./scripts/development/migrate_and_run_server
