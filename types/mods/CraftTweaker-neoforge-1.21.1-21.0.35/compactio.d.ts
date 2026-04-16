declare module 'compactio' {
  import { AutoCloseable } from 'java.lang';

  interface CompactBytesDataInput extends CompactDataInput, AutoCloseable {}
  class CompactBytesDataInput extends CompactDataInput {
    constructor(data: number[]);

    constructor(data: number[], offset: number);
    close(): void;
    get offset(): number;
    hasMore(): boolean;
    readBool(): boolean;
    readBoolArray(): boolean[];
    readByte(): number;
    readByteArray(): number[];
    readBytes(): number[];
    readChar(): string;
    readDouble(): number;
    readDoubleArray(): number[];
    readDoubleArrayRaw(length: number): number[];
    readFloat(): number;
    readFloatArray(): number[];
    readFloatArrayRaw(length: number): number[];
    readInt(): number;
    readIntArray(): number[];
    readIntArrayRaw(length: number): number[];
    readLong(): number;
    readLongArray(): number[];
    readLongArrayRaw(length: number): number[];
    readRawBytes(size: number): number[];
    readSByte(): number;
    readSByteArray(): number[];
    readShort(): number;
    readShortArray(): number[];
    readShortArrayRaw(length: number): number[];
    readString(): string;
    readStringArray(): string[];
    readStringArrayRaw(length: number): string[];
    readUInt(): number;
    readUIntArray(): number[];
    readUIntArrayRaw(length: number): number[];
    readULong(): number;
    readULongArray(): number[];
    readULongArrayRaw(length: number): number[];
    readUShort(): number;
    readUShortArray(): number[];
    readUShortArrayRaw(length: number): number[];
    readVarInt(): number;
    readVarIntArray(): number[];
    readVarIntArrayRaw(length: number): number[];
    readVarLong(): number;
    readVarLongArray(): number[];
    readVarLongArrayRaw(length: number): number[];
    readVarUInt(): number;
    readVarUIntArray(): number[];
    readVarUIntArrayRaw(length: number): number[];
    readVarULong(): number;
    readVarULongArray(): number[];
    readVarULongArrayRaw(length: number): number[];
    skip(bytes: number): void;
  }


  interface CompactBytesDataOutput extends CompactDataOutput, AutoCloseable {}
  class CompactBytesDataOutput extends CompactDataOutput {
    asByteArray(): number[];
    close(): void;
    flush(): void;
    writeBool(value: boolean): void;
    writeBoolArray(data: boolean[]): void;
    writeByte(value: number): void;
    writeByteArray(data: number[]): void;
    writeBytes(data: number[]): void;
    writeBytes(data: number[], offset: number, length: number): void;
    writeChar(value: string): void;
    writeDouble(value: number): void;
    writeDoubleArray(data: number[]): void;
    writeDoubleArrayRaw(data: number[]): void;
    writeFloat(value: number): void;
    writeFloatArray(data: number[]): void;
    writeFloatArrayRaw(data: number[]): void;
    writeInt(value: number): void;
    writeIntArray(data: number[]): void;
    writeIntArrayRaw(data: number[]): void;
    writeLong(value: number): void;
    writeLongArray(data: number[]): void;
    writeLongArrayRaw(data: number[]): void;
    writeRawBytes(value: number[]): void;
    writeRawBytes(value: number[], offset: number, length: number): void;
    writeSByte(value: number): void;
    writeSByteArray(data: number[]): void;
    writeShort(value: number): void;
    writeShortArray(data: number[]): void;
    writeShortArrayRaw(data: number[]): void;
    writeString(str: string): void;
    writeStringArray(data: string[]): void;
    writeStringArrayRaw(data: string[]): void;
    writeUInt(value: number): void;
    writeUIntArray(data: number[]): void;
    writeUIntArrayRaw(data: number[]): void;
    writeULong(value: number): void;
    writeULongArray(data: number[]): void;
    writeULongArrayRaw(data: number[]): void;
    writeUShort(value: number): void;
    writeUShortArray(data: number[]): void;
    writeUShortArrayRaw(data: number[]): void;
    writeVarInt(value: number): void;
    writeVarIntArray(data: number[]): void;
    writeVarIntArrayRaw(data: number[]): void;
    writeVarLong(value: number): void;
    writeVarLongArray(data: number[]): void;
    writeVarLongArrayRaw(data: number[]): void;
    writeVarUInt(value: number): void;
    writeVarUIntArray(data: number[]): void;
    writeVarUIntArrayRaw(data: number[]): void;
    writeVarULong(value: number): void;
    writeVarULongArray(data: number[]): void;
    writeVarULongArrayRaw(data: number[]): void;
  }


  interface CompactDataInput extends AutoCloseable {}
  class CompactDataInput extends AutoCloseable {
    close(): void;
    hasMore(): boolean;
    readBool(): boolean;
    readBoolArray(): boolean[];
    readByte(): number;
    readByteArray(): number[];
    readBytes(): number[];
    readChar(): string;
    readDouble(): number;
    readDoubleArray(): number[];
    readDoubleArrayRaw(var1: number): number[];
    readFloat(): number;
    readFloatArray(): number[];
    readFloatArrayRaw(var1: number): number[];
    readInt(): number;
    readIntArray(): number[];
    readIntArrayRaw(var1: number): number[];
    readLong(): number;
    readLongArray(): number[];
    readLongArrayRaw(var1: number): number[];
    readRawBytes(var1: number): number[];
    readSByte(): number;
    readSByteArray(): number[];
    readShort(): number;
    readShortArray(): number[];
    readShortArrayRaw(var1: number): number[];
    readString(): string;
    readStringArray(): string[];
    readStringArrayRaw(var1: number): string[];
    readUInt(): number;
    readUIntArray(): number[];
    readUIntArrayRaw(var1: number): number[];
    readULong(): number;
    readULongArray(): number[];
    readULongArrayRaw(var1: number): number[];
    readUShort(): number;
    readUShortArray(): number[];
    readUShortArrayRaw(var1: number): number[];
    readVarInt(): number;
    readVarIntArray(): number[];
    readVarIntArrayRaw(var1: number): number[];
    readVarLong(): number;
    readVarLongArray(): number[];
    readVarLongArrayRaw(var1: number): number[];
    readVarUInt(): number;
    readVarUIntArray(): number[];
    readVarUIntArrayRaw(var1: number): number[];
    readVarULong(): number;
    readVarULongArray(): number[];
    readVarULongArrayRaw(var1: number): number[];
    skip(var1: number): void;
  }


  interface CompactDataOutput extends AutoCloseable {}
  class CompactDataOutput extends AutoCloseable {
    close(): void;
    flush(): void;
    writeBool(var1: boolean): void;
    writeBoolArray(var1: boolean[]): void;
    writeByte(var1: number): void;
    writeByteArray(var1: number[]): void;
    writeBytes(var1: number[]): void;
    writeBytes(var1: number[], var2: number, var3: number): void;
    writeChar(var1: string): void;
    writeDouble(var1: number): void;
    writeDoubleArray(var1: number[]): void;
    writeDoubleArrayRaw(var1: number[]): void;
    writeFloat(var1: number): void;
    writeFloatArray(var1: number[]): void;
    writeFloatArrayRaw(var1: number[]): void;
    writeInt(var1: number): void;
    writeIntArray(var1: number[]): void;
    writeIntArrayRaw(var1: number[]): void;
    writeLong(var1: number): void;
    writeLongArray(var1: number[]): void;
    writeLongArrayRaw(var1: number[]): void;
    writeRawBytes(var1: number[]): void;
    writeRawBytes(var1: number[], var2: number, var3: number): void;
    writeSByte(var1: number): void;
    writeSByteArray(var1: number[]): void;
    writeShort(var1: number): void;
    writeShortArray(var1: number[]): void;
    writeShortArrayRaw(var1: number[]): void;
    writeString(var1: string): void;
    writeStringArray(var1: string[]): void;
    writeStringArrayRaw(var1: string[]): void;
    writeUInt(var1: number): void;
    writeUIntArray(var1: number[]): void;
    writeUIntArrayRaw(var1: number[]): void;
    writeULong(var1: number): void;
    writeULongArray(var1: number[]): void;
    writeULongArrayRaw(var1: number[]): void;
    writeUShort(var1: number): void;
    writeUShortArray(var1: number[]): void;
    writeUShortArrayRaw(var1: number[]): void;
    writeVarInt(var1: number): void;
    writeVarIntArray(var1: number[]): void;
    writeVarIntArrayRaw(var1: number[]): void;
    writeVarLong(var1: number): void;
    writeVarLongArray(var1: number[]): void;
    writeVarLongArrayRaw(var1: number[]): void;
    writeVarUInt(var1: number): void;
    writeVarUIntArray(var1: number[]): void;
    writeVarUIntArrayRaw(var1: number[]): void;
    writeVarULong(var1: number): void;
    writeVarULongArray(var1: number[]): void;
    writeVarULongArrayRaw(var1: number[]): void;
  }

}