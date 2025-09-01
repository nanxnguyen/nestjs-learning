// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CreateUserDto } from './create-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(private readonly prisma: PrismaService) {}

//   async findAll() {
//     return this.prisma.user.findMany({
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         phone: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   }

//   async findOne(id: number) {
//     return this.prisma.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         phone: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   }

//   async create(createUserDto: CreateUserDto) {
//     return this.prisma.user.create({
//       data: createUserDto,
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         phone: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   }

//   async update(id: number, updateUserDto: Partial<CreateUserDto>) {
//     return this.prisma.user.update({
//       where: { id },
//       data: updateUserDto,
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         phone: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });
//   }

//   async remove(id: number) {
//     return this.prisma.user.delete({
//       where: { id },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         phone: true,
//       },
//     });
//   }
// }
