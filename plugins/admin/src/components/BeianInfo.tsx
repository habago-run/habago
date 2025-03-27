import Image from "next/image";
import policeIcon from "../app/img/police.png";

export default function BeianInfo() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-2 pb-4 text-[12px]">
      ICP备案/许可证号：<a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2025063359号-1</a>
      <Image src={policeIcon} alt="公安备案图标" width={16} height={16} className="h-4 w-4"/>
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=61011302002082" rel="noreferrer" target="_blank">陕公网安备61011302002082号</a>
    </div>
  );
} 