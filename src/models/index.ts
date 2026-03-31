import mongoose, { Schema, model, models } from 'mongoose';

const LeadSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    stream: { type: String },
    class: { type: String },
    goal: { type: String },
    studentLocation: { type: String },
    targetCourse: { type: String },
    interestedColleges: { type: String },
    additionalInfo: { type: String },
    status: { type: String, default: 'New' },
    date: { type: String, default: () => new Date().toLocaleString() }
}, { timestamps: true });

export const Lead = models.Lead || model('Lead', LeadSchema);

const NoticeSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, default: 'info' }, // urgent, info, new
    date: { type: String, default: () => new Date().toLocaleDateString() },
    phone: { type: String },
    email: { type: String }
}, { timestamps: true });

export const Notice = models.Notice || model('Notice', NoticeSchema);

const ReviewSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String },
    avatar: { type: String },
    text: { type: String, required: true }
}, { timestamps: true });

export const Review = models.Review || model('Review', ReviewSchema);

const CollegeSchema = new Schema({
    name: { type: String, required: true },
    excellence: { type: String },
    tags: { type: String }, // comma separated
    image: { type: String }, // URL
    link: { type: String }, // Direct Link to college
    location: { type: String }, // e.g. Bangalore, Pune
    color: { type: String }
}, { timestamps: true });

export const College = models.College || model('College', CollegeSchema);

const CounsellorSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    phone: { type: String },
    email: { type: String }
}, { timestamps: true });

export const Counsellor = models.Counsellor || model('Counsellor', CounsellorSchema);
