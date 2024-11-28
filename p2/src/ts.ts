import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inversionista, InversionistaSchema } from './inversionista.schema';
import { ConceptoInversion, ConceptoInversionSchema } from './concepto-inversion.schema';
import { InversionRealizada, InversionRealizadaSchema } from './inversion-realizada.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inversionista.name, schema: InversionistaSchema },
      { name: ConceptoInversion.name, schema: ConceptoInversionSchema },
      { name: InversionRealizada.name, schema: InversionRealizadaSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class InversionesModule {}


import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Inversionista Schema
@Schema()
export class Inversionista extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  identificacion: string;
}

export const InversionistaSchema = SchemaFactory.createForClass(Inversionista);

// Concepto de Inversión Schema
@Schema()
export class ConceptoInversion extends Document {
  @Prop({ required: true })
  concepto: string;

  @Prop()
  detalle: string;
}

export const ConceptoInversionSchema = SchemaFactory.createForClass(ConceptoInversion);

// Inversión Realizada Schema
@Schema()
export class InversionRealizada extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Inversionista', required: true })
  inversionista: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ConceptoInversion', required: true })
  conceptoInversion: Types.ObjectId;

  @Prop({ required: true })
  valorInversion: number;

  @Prop({ required: true })
  fecha: Date;

  @Prop({ required: true })
  duracionDias: number;
}

export const InversionRealizadaSchema = SchemaFactory.createForClass(InversionRealizada);
