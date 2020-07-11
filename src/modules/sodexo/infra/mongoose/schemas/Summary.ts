import mongoose, { Document, Schema } from 'mongoose';

export interface ISummary extends Document {
  balance: string;
  lastBenefit: string;
  nextBenefit: string;
  cardNumber: string;
}

const SummarySchema: Schema = new Schema(
  {
    balance: { type: String, required: true },
    lastBenefit: { type: String, required: true },
    nextBenefit: { type: String, required: true },
    cardNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<ISummary>('Summary', SummarySchema);
