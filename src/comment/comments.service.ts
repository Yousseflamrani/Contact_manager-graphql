import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        userId: userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.comment.findMany({
      where: { userId: userId },
    });
  }

  async findOne(userId: number, id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id, userId: userId },
    });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    return comment;
  }

  async update(userId: number, id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id, userId: userId },
    });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    return this.prisma.comment.update({
      where: { id: id },
      data: { ...updateCommentDto },
    });
  }

  async remove(userId: number, id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: id, userId: userId },
    });

    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }

    return this.prisma.comment.delete({
      where: { id: id },
    });
  }
}
