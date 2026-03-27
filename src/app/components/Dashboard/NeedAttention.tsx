import React from 'react';
import './NeedAttention.css';

type AttentionItem = {
  name: string;
  organization: string;
  status: 'Clarification Required' | 'Missing Identifier';
};

interface NeedAttentionProps {
  count: number;
  items: AttentionItem[];
}

const NeedAttention: React.FC<NeedAttentionProps> = ({ count, items }) => {
  return (
    <div className="need-attention-card">
<div className="header">
<h2 className="font-['Roboto',sans-serif] font-bold text-[19px] leading-normal text-[#4A4A4A]">
  Need Attention
</h2>

<span
  className="flex items-center h-[24px] px-[9px] rounded-full bg-[#FEC] text-[#B86A0F] font-['Roboto',sans-serif] text-[13px] font-normal leading-[13px]"
>
  {count}
</span>
  
</div>

      {items?.length > 0 ? (

<ul className="attention-list">
  {items.map((item, index) => (
    <li
      key={index}
      className="attention-item flex items-center justify-between gap-2"
    >
      {/* Left side: name + org */}
      <div className="info flex flex-col">
        <span className="name font-['Roboto',sans-serif] text-sm font-medium text-[#181d1f]">
          {item.name}
        </span>
        <span className="org text-xs text-[#6b7280]">
          {item.organization || '-'}
        </span>
      </div>

      {/* Right side: status + arrow */}
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center h-[20px] px-[9px] rounded-full border border-[#F9D250] bg-[#FEC] text-xs font-['Roboto',sans-serif] font-medium whitespace-nowrap ${
            item.status === 'Clarification Required'
              ? 'text-[#b86a0f]'
              : 'text-[#BF494E]'
          }`}
        >
          {item.status}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 flex-shrink-0"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="#9CA3AF"
            strokeWidth="1.333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </li>
  ))}
</ul>

      ) : (
        <div>
          <div style={{ marginTop: '50px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              className="mx-auto mb-4"
            >
              <path
                d="M26.7833 84.7626C13.9377 59.5059 9.96258 33.1807 26.8896 20.7167C43.8167 8.2528 64.2154 25.377 88.0788 39.6287C124.742 61.5255 106.852 94.2694 87.9725 103.675C67.773 113.738 40.3516 111.442 26.7833 84.7626Z"
                fill="#D7EEF4"
              />
              <path
                d="M97.4038 73.6752C97.4038 72.6828 96.5993 71.8783 95.6069 71.8783C94.6145 71.8783 93.8101 72.6828 93.8101 73.6752C93.8101 74.6676 94.6145 75.4721 95.6069 75.4721V76.9096C93.8206 76.9096 92.3726 75.4615 92.3726 73.6752C92.3726 71.8889 93.8206 70.4408 95.6069 70.4408C97.3932 70.4408 98.8413 71.8889 98.8413 73.6752C98.8413 75.4615 97.3932 76.9096 95.6069 76.9096V75.4721C96.5993 75.4721 97.4038 74.6676 97.4038 73.6752Z"
                fill="#77B0BE"
              />
              <path
                d="M31.6347 43.8472V38.8124H26.6069C26.0115 38.8124 25.5288 38.3297 25.5288 37.7343C25.5289 37.1389 26.0115 36.6562 26.6069 36.6562H31.6347V31.6284C31.6347 31.033 32.1174 30.5504 32.7128 30.5503C33.3082 30.5503 33.7909 31.033 33.7909 31.6284V36.6562H38.8257C39.4211 36.6562 39.9037 37.1389 39.9038 37.7343C39.9038 38.3297 39.4211 38.8124 38.8257 38.8124H33.7909V43.8472C33.7909 44.4426 33.3082 44.9253 32.7128 44.9253C32.1174 44.9252 31.6347 44.4426 31.6347 43.8472Z"
                fill="#77B0BE"
              />
              <path
                d="M84.7936 77.6819L81.7143 71.2567C80.9214 69.5641 80.5183 67.7165 80.5346 65.8489L80.6581 55.7242C80.6723 51.415 79.2415 47.2244 76.5925 43.8165C73.9435 40.4087 70.2279 37.9786 66.0346 36.9115C66.0669 36.7187 66.0889 36.5244 66.1006 36.3293C66.1045 35.7158 65.987 35.1076 65.7548 34.5394C65.5226 33.9712 65.1803 33.4541 64.7474 33.0176C64.3145 32.5811 63.7994 32.2338 63.2317 31.9954C62.664 31.7571 62.0547 31.6324 61.4386 31.6286C60.8225 31.6247 60.2116 31.7417 59.6409 31.9728C59.0702 32.204 58.5508 32.5448 58.1124 32.9759C57.674 33.4069 57.3251 33.9196 57.0858 34.4849C56.8464 35.0502 56.7212 35.6568 56.7173 36.2702C56.7182 36.4653 56.7354 36.6599 56.7687 36.8521C52.5624 37.8651 48.8156 40.2463 46.1218 43.6185C43.4279 46.9907 41.9409 51.1613 41.8962 55.4699L41.8305 65.5904C41.8194 67.4535 41.3888 69.2905 40.5704 70.9661L37.4443 77.3635C37.1389 77.9907 36.9979 78.6848 37.0345 79.3809C37.071 80.077 37.284 80.7526 37.6535 81.3447C38.023 81.9368 38.537 82.4262 39.1477 82.7672C39.7583 83.1082 40.4457 83.2898 41.1458 83.295L81.0494 83.5531C81.7458 83.5523 82.4308 83.3767 83.041 83.0424C83.6511 82.7081 84.1667 82.226 84.54 81.6407C84.9133 81.0553 85.1322 80.3856 85.1766 79.6936C85.2209 79.0017 85.0892 78.3097 84.7936 77.6819Z"
                fill="#0696A6"
              />
              <path
                d="M56.5142 85.9856C56.2109 85.9846 55.912 86.0581 55.6441 86.1996C55.3761 86.3411 55.1473 86.5462 54.978 86.7967C54.8087 87.0473 54.704 87.3355 54.6733 87.636C54.6426 87.9364 54.6867 88.2397 54.8018 88.5191C55.2999 89.7535 56.1557 90.8123 57.2603 91.5608C58.3648 92.3093 59.6681 92.7135 61.0042 92.722C62.3403 92.7304 63.6486 92.3428 64.7627 91.6084C65.8767 90.874 66.746 89.8261 67.2598 88.5981C67.3779 88.3209 67.4257 88.019 67.399 87.719C67.3723 87.419 67.2719 87.1301 67.1066 86.8779C66.9414 86.6256 66.7163 86.4177 66.4514 86.2725C66.1864 86.1272 65.8896 86.0491 65.5871 86.0449L56.5142 85.9856Z"
                fill="#0696A6"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-700">
            You have no requests that require attention.
          </p>
        </div>
      )}
    </div>
  );
};

export default NeedAttention;
