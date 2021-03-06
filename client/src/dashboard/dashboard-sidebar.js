import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "./logo";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";

// import theme from '../theme/index'

import { NavItem } from "./nav-item";

// import { WithNextRouter } from 'storybook-addon-next-router/dist/decorators';

// export const decorators = [WithNextRouter];

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: " داشبورد",
  },
  {
    href: "/assets",
    icon: <ChartBarIcon fontSize="small" />,
    title: " دارایی ها",
  },
  {
    href: "/add-asset",
    icon: <ChartBarIcon fontSize="small" />,
    title: "افزودن دارایی",
  },
  {
    href: "/hardware",
    icon: <ChartBarIcon fontSize="small" />,
    title: " سخت افزار ها",
  },
  {
    href: "/software",
    icon: <ChartBarIcon fontSize="small" />,
    title: " نرم افزار ها",
  },
  {
    href: "/manage-users",
    icon: <ChartBarIcon fontSize="small" />,
    title: " مدیریت حساب ها",
  },
  {
    href: "/add-user",
    icon: <ChartBarIcon fontSize="small" />,
    title: " اضافه کردن کاربر",
  },
  {
    href: "/reports",
    icon: <ChartBarIcon fontSize="small" />,
    title: " گزارشات",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const { theme } = props;
  // const router = useRouter();
  // console.log(router);

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, [useParams()]);

  const content = (
    <>
      <Box
        sx={{
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link to="/">
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              px: 2,
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "#363062",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                  fontFamily="Vazir"
                >
                  مهدی رحیم سیرت
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                  fontFamily="Vazir"
                >
                  {" "}
                  نوع دسترسی : مدیر
                </Typography>
              </div>
            </Box>
          </Box>
        </div>

        <Divider
          sx={{
            width: "100%",
            borderColor: "#FFFFFF",
            my: 3,
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  // return (
  //   <Drawer
  //     anchor="right"
  //     open
  //     PaperProps={{
  //       sx: {
  //         backgroundColor: 'neutral.900',
  //         color: '#FFFFFF',
  //         width: 280
  //       }
  //     }}
  //     variant="permanent"
  //   >
  //     {content}
  //   </Drawer>
  // );

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#2A2550",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#2A2550",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
