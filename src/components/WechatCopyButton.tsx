import { useState } from 'react';
import { BRAND } from '../data/products';

interface WechatCopyButtonProps {
  id?: string;
}

export function WechatCopyButton({ id }: WechatCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(BRAND.wechatId);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = BRAND.wechatId;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleCopy}
      className={`btn-copy ${copied ? 'btn-copy--done' : ''}`}
      aria-live="polite"
    >
      {copied ? '已复制微信号' : '复制微信号'}
    </button>
  );
}
