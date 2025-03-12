import { Media } from "@/components/features/home/challenge_card";

interface Timestamp {
    _seconds: number;
    _nanoseconds: number;
}

interface InviteLink {
    link: string;
    usage_limit: number | "unlimited";
    expires_at: Timestamp;
}

interface InviteLinks {
    participants: InviteLink;
    judges: InviteLink;
}

export interface CommentType {
    id: string;
    challengeId: string;
    userId: string;
    username: string;
    profile_picture: string;
    message: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    like_count: number;
}

interface Challenge {
    reports: any[]; // Assuming reports can be of any type, specify a more precise type if known
    title: string;
    description: string;
    challengeContent: string;
    timeLimit: number;
    reward: number;
    visibility: string;
    startDate: Timestamp;
    endDate: Timestamp;
    revisionDuration: number;
    tags: string[];
    attachments: string[];
    status: string;
    createdBy: string;
    id: string;
    updated_at: Timestamp;
    created_at: Timestamp;
    inviteLinks: InviteLinks;
    comments: CommentType[];
}

export interface ChallengeResponse {
    challenge: Challenge;
}