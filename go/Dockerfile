FROM golang:1.18.1 as builder
WORKDIR /go/src/desafio/

COPY app.go ./

RUN go mod init && \
    go get -d -v && \
    go build -o app

FROM scratch
WORKDIR /app/
COPY --from=builder /go/src/desafio/app ./
CMD ["./app"]  