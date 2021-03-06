import styled from "styled-components";
import { useViewportScroll, motion, useAnimation } from "framer-motion";
import profile from "../images/profile.png";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import media from "../media";

const Nav = styled(motion.nav)`
  padding: 20px 60px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 10px 30px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  width: 100px;
  height: calc(100px / 3.7);
  fill: ${(props) => props.theme.red};

  ${media.desktop} {
    width: 80px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  &:first-child {
    margin-left: 50px;
  }

  & + li {
    margin-left: 20px;
  }

  ${media.desktop} {
    &:first-child {
      margin-left: 20px;
    }
  }

  ${media.tablet} {
    width: 50px;
    font-size: 12px;

    &:first-child {
      display: none;
    }
  }
`;

const Search = styled.form`
  position: relative;
  height: 100%;
`;

const Input = styled(motion.input)`
  all: unset;
  box-sizing: border-box;
  height: 100%;
  width: 200px;
  padding-left: 25px;
  background-color: rgba(20, 20, 20, 0.6);
  color: ${(props) => props.theme.white.light};
  margin-right: 20px;
  border: 1px solid ${(props) => props.theme.white.plain};
  transform-origin: right center;
`;

const Button = styled(motion.button)`
  all: unset;
  position: absolute;
  font-size: 20px;
  top: calc((100% - 20px) / 2);
  left: 5px;
  cursor: pointer;
`;

const Profile = styled.div`
  width: 32px;
  height: 32px;
  background-image: url(${profile});
  background-size: cover;
  border-radius: 5px;
`;

const NavVariants = {
  initial: { backgroundColor: "rgba(12, 12, 12, 0)" },
  scroll: { backgroundColor: "rgba(12, 12, 12, 1)" },
};

const InputVariants = {
  close: { scaleX: 0, transition: { type: "linear" } },
  open: { scaleX: 1, transition: { type: "linear" } },
};

function Header() {
  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const { register, handleSubmit } = useForm<{ keyword: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);

  const onSubmit = ({ keyword }: { keyword: string }) => {
    navigate(`search?keyword=${keyword}`);
  };

  const toggleSearch = () => {
    if (search) {
      inputAnimation.start("close");
    } else {
      inputAnimation.start("open");
    }

    setSearch((prev) => !prev);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("initial");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={NavVariants} initial="initial" animate={navAnimation}>
      <Col>
        <Link to="">
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="">Home</Link>
          </Item>
          <Item>
            <Link to="tv">TV Show</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("keyword", { required: true })}
            type="text"
            placeholder="???????????? ??????????????????."
            variants={InputVariants}
            initial="close"
            animate={inputAnimation}
          />
          <Button
            type="button"
            onClick={toggleSearch}
            animate={{ x: search ? 0 : 180 }}
            transition={{ type: "linear" }}
          >
            <BiSearch />
          </Button>
        </Search>
        <Profile />
      </Col>
    </Nav>
  );
}

export default Header;
