npx prisma migrate dev
npx prisma studio
npx prisma generate
lsof -ti:5000
npx nest generate module common

- Build Image
docker build -t [tên-app]:[version] .
Ví dụ: docker build -t marusei-be:latest .

I - Inspect (Kiểm tra)


docker images | grep [tên-app]
Ví dụ: docker images | grep marusei-be

P - Port & Parameters (Chạy với cổng)

docker run -d -p [cổng-host]:[cổng-container] --name [tên-container] [image]
Ví dụ: docker run -d -p 3000:3000 --name marusei-app marusei-be:latest

T - Tag & Test (Gắn tag và test)
docker exec -it [tên-container] sh
Ví dụ: docker exec -it marusei-app sh

R - Remove & Restart (Dọn dẹp)
docker stop [tên-container] && docker rm [tên-container]

U - Up với Docker Compose

docker-compose up -d --build


N - Navigate logs (Xem logs)

docker logs -f [tên-container]



# All-in-one: Build → Run → Check
docker build -t marusei-be . && docker run -d -p 3000:3000 --name marusei-app marusei-be && docker logs -f marusei-app


# Cho Marusei-BE
BUILD:  docker build -t marusei-be:latest .
RUN:    docker run -d -p 3000:3000 --env-file .env --name marusei-app marusei-be:latest
CHECK:  docker logs -f marusei-app
CLEAN:  docker stop marusei-app && docker rm marusei-app
Ghi nhớ: "BIPT-RUN" = Build → Inspect → Port → Tag → Remove → Up → Navigate! 🐳
