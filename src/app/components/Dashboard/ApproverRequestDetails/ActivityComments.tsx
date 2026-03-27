import React, { useState } from "react";

interface Comment {
  author: string;
  role: string;
  text: string;
  timestamp: string;
  bordered?: boolean;
}

interface ActivityCommentsProps {
  comments: Comment[];
}

const ActivityComments: React.FC<ActivityCommentsProps> = ({ comments }) => {
      const [comment, setComment] = useState("");
  const maxLength = 300;
  return (
    <section className="flex flex-col items-start gap-8 p-6 rounded-[8px] bg-[#FFF] w-full">
      {/* Section Title */}
      <h2 className="text-[#4A4A4A] font-['Roboto',sans-serif] text-[19px] font-bold leading-normal">
        Activity & Comments
      </h2>

{/* Comment Input */}
<div className="flex flex-col items-start gap-4 w-full">
  {/* Label above textarea */}
  <label
    htmlFor="comment"
    className="
      text-[#4A4A4A]
      font-['Roboto',sans-serif]
      text-[16px] font-medium leading-[16px]
    "
  >
    Add a Comment...
  </label>

  {/* Textarea wrapper */}
  <div className="relative w-full">
    <textarea
      id="comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      maxLength={maxLength}
      className="
        flex h-[77px] w-full
        border border-[#CCC] rounded-[4px]
        p-[4px] px-[8px]
        font-['Roboto',sans-serif] text-sm text-[#181D1F]
        resize-none
      "
      placeholder="Write a comment..."
    />

    {/* Character count inside textarea (bottom-right) */}
    <span
      className="
        absolute bottom-2 right-3
        text-xs text-[#6B7280]
        font-['Roboto',sans-serif]
      "
    >
      {comment.length}/{maxLength}
    </span>
  </div>

  {/* Post Comment Button aligned right */}
  <div className="flex justify-end w-full">
    <button
      className="
        flex items-center justify-center
        h-[32px] min-w-[94px]
        px-[12px]
        rounded-[2px]
        border border-[#498E2B]
        bg-[#FFF]
        text-[#498E2B]
        font-['Roboto',sans-serif] text-[15px] font-medium leading-[13px] tracking-[0.3px]
        text-center
        transition-colors
        hover:bg-gray-100
        cursor-pointer
      "
    >
      Post Comment
    </button>
  </div>
</div>

      {/* Comments List */}
     {comments.map((c, i) => (
  <div
    key={i}
    className="flex flex-col gap-2 p-5 rounded-[8px] bg-[#F7F7F7] w-full"
  >
    {/* Author + Timestamp in one row */}
    <div className="flex justify-between w-full">
      <span className="font-['Roboto',sans-serif] font-bold text-sm text-[#181D1F]">
        {c.author} ({c.role})
      </span>
      <span className="text-xs text-[#6B7280] font-['Roboto',sans-serif]">
        {c.timestamp}
      </span>
    </div>

    {/* Comment text */}
    <p className="font-['Roboto',sans-serif] text-sm text-[#181D1F]">
      {c.text}
    </p>
  </div>
))}
    </section>
  );
};

export default ActivityComments;