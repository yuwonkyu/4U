import { Link } from "react-router";
import Logo from "../assets/images/bg-logo.svg";
import Button from "../components/Button";
import Arrow from "../assets/icons/arrow.svg?react";

const NotFoundPage = () => {
  return (
    <>
      <div className="bg-peach-20 bg-screen relative">
        {/* 남자배경 */}
        <div className="tablet:h-314 tablet:w-284 absolute bottom-0 left-0 z-0 h-158 w-153 bg-[url('./assets/images/bg-man.svg')] bg-contain bg-bottom bg-no-repeat duration-500 ease-in-out"></div>
        {/* 여자배경 */}
        <div className="tablet:h-314 tablet:w-250 absolute right-0 bottom-0 z-0 h-158 w-153 bg-[url('./assets/images/bg-woman.svg')] bg-contain bg-bottom bg-no-repeat duration-500 ease-in-out"></div>
        {/* 페이지 오류 */}
        <div className="flex h-screen flex-col items-center justify-center gap-72 bg-[url('./assets/images/bg-starRain.svg')] bg-[length:auto_50vh] bg-top bg-repeat-x">
          <Link to="/">
            <img src={Logo} alt="Logo" className="tablet:w-456 w-248" />
          </Link>

          <div className="flex flex-col items-center justify-center">
            <p className="tablet:text-h1 text-h2 text-grayscale-60 font-bold">
              페이지를 찾을 수 없어요
            </p>
            <p className="text-grayscale-40 tablet:text-body1 text-body2 mt-4">
              존재하지 않는 경로로 이동하셨습니다.
            </p>
          </div>
          <Link to="/list">
            <Button type="empty" className="tablet:text-16 text-14">
              질문하러 가기
              <Arrow className="text-brown-40 size-20" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFoundPage;
