import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getSubjectList } from "../api/subjects";
import logo from "../assets/images/bg-logo.svg";
import Arrow from "../assets/icons/arrow.svg?react";
import Button from "../components/Button";
import UserList from "../components/user/UserList";
import DropdownTrigger from "../components/dropdown/DropdownTrigger";
import Pagenation from "../components/Pagenation";
import UserModal from "../components/user/UserModal";

function ListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [totalUsers, setTotalUsers] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleClose = () => setIsModalOpen(false);

  const handleLatestClick = () => {
    setSort("createdAt");
    setCurrentPage(1);
  };
  const handleNameClick = () => {
    setSort("name");
    setCurrentPage(1);
  };

  const options = [
    { label: "최신순", value: "createdAt", click: handleLatestClick },
    { label: "이름순", value: "name", click: handleNameClick },
  ];

  const handleButtonClick = () => {
    const data = localStorage.getItem("subjects");
    if (data) {
      const subjects = JSON.parse(data);
      if (subjects.length !== 0) {
        setSubjects(subjects);
        setIsModalOpen(true);
        return;
      }
    }
    navigate("/");
  };

  const handleResize = useCallback(() => {
    document.documentElement.clientWidth > 903
      ? setItemsPerPage(8)
      : setItemsPerPage(6);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const user = await getSubjectList({ limit: 8, offset, sort });
      setUsers(user.data.results);
      setTotalUsers(user.data.count);
      setTotalPages(Math.ceil(totalUsers / itemsPerPage));
    };
    getUser();
  }, [totalUsers, itemsPerPage, currentPage, sort]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="bg-peach-20 min-h-screen">
      <div className="tablet:flex-row tablet:justify-between tablet:bg-[length:100%_465px] flex flex-col items-center justify-center gap-24 bg-[url(/src/assets/images/bg-Fly.svg)] bg-[length:100%_250px] bg-center bg-no-repeat px-50 pt-40 pb-60">
        <Link to="/">
          <img
            className="tablet:w-146 tablet:h-29 h-49 w-244 duration-500 ease-in-out"
            src={logo}
          ></img>
        </Link>
        <Button
          type="empty"
          onClick={handleButtonClick}
          className="duration-400 ease-in-out"
        >
          답변하러 가기
          <Arrow className="text-brown-40 size-18" />
        </Button>
        {isModalOpen && <UserModal onClose={handleClose} subjects={subjects} />}
      </div>
      <div className="tablet:gap-32 tablet:px-50 flex flex-col gap-20 px-24">
        <div className="tablet:flex-col tablet:gap-20 flex items-center justify-between">
          <p className="tablet:text-h1 text-h3 font-regular">
            누구에게 질문할까요?
          </p>
          <DropdownTrigger
            options={options}
            type="user"
            className="top-40 w-79"
          />
        </div>
        <div className="tablet:gap-20 flex flex-wrap items-center justify-center gap-16">
          <UserList users={users} itemsPerPage={itemsPerPage} />
        </div>
      </div>
      <Pagenation
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ListPage;
