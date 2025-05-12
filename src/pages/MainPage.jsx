import Button from "../components/Button";
import InputField from "../components/InputField";
import Logo from "../assets/images/bg-logo.svg";
import Arrow from "../assets/icons/arrow.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createSubject } from "../api/subjects";

const MainPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleListClick = () => {
    navigate("/list");
  };

  const handleQuestionClick = async () => {
    try {
      const response = await createSubject({ name });
      const subjectId = response.id;
      const newSubject = {
        id: subjectId,
        name: response.name,
        profile: response.imageSource,
      };
      const subjects = JSON.parse(localStorage.getItem("subjects") || "[]");
      subjects.unshift(newSubject);
      localStorage.setItem("subjects", JSON.stringify(subjects));
      localStorage.setItem("selectedSubject", JSON.stringify(newSubject));
      navigate(`/post/${subjectId}`);
    } catch (error) {
      console.error("이름 등록 실패:", error);
    }
  };

  return (
    <div className="bg-peach-20 bg-screen relative">
      {/* 남자배경 */}
      <div className="tablet:h-314 tablet:w-284 absolute bottom-0 left-0 z-0 h-158 w-153 bg-[url('./assets/images/bg-man.svg')] bg-contain bg-bottom bg-no-repeat duration-500 ease-in-out"></div>
      {/* 여자배경 */}
      <div className="tablet:h-314 tablet:w-250 absolute right-0 bottom-0 z-0 h-158 w-153 bg-[url('./assets/images/bg-woman.svg')] bg-contain bg-bottom bg-no-repeat duration-500 ease-in-out"></div>
      {/* 메인 콘텐츠 */}
      <div className="z-10 flex h-screen flex-col items-center justify-center gap-24 bg-[url('./assets/images/bg-starRain.svg')] bg-[length:auto_50vh] bg-top bg-repeat-x">
        <img
          src={Logo}
          alt="Logo"
          className="tablet:w-456 tablet:mb-26 mb-20 w-248 duration-500 ease-in-out"
        />
        <Button
          type="empty"
          onClick={handleListClick}
          className="tablet:absolute tablet:top-44 tablet:right-50 pc:top-45 pc:right-130 tablet:text-16 text-14 z-11 duration-500 ease-in-out"
        >
          질문하러 가기
          <Arrow className="text-brown-40 size-20" />
        </Button>
        <div className="bg-grayscale-10 border-grayscale-10 tablet:p-32 z-11 flex flex-col items-center justify-center gap-16 rounded-2xl p-24 duration-500 ease-in-out">
          <InputField
            className="duration-500 ease-in-out"
            name={name}
            setName={setName}
            placeholder={"이름을 입력해주세요"}
          />
          <Button
            className="tablet:w-336"
            type="fill"
            disabled={name.trim().length === 0 || name.trim().length > 15}
            onClick={handleQuestionClick}
          >
            질문 받기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
