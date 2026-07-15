import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await req.json();

    await prisma.folders.update({
      where: {
        id: BigInt(id),
      },
      data: {
        folder_name: body.folder_name,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Folder berhasil diubah",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Rename gagal",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.folders.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Folder berhasil dihapus",
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: "Delete gagal",
      },
      {
        status: 500,
      }
    );
  }
}