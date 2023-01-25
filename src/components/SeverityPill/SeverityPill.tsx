import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Box, Theme as muiTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import React from "react";

type SeverityPillColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "warning"
  | "success";

type SeverityPillSize =
  | "extraSmall"
  | "small"
  | "medium"
  | "mediumSemi"
  | "mediumNarrow"
  | "mediumNarrowLong"
  | "mediumNarrowLonger"
  | "mediumLarge"
  | "large";

type SeverityPillType = true | false;

interface SeverityPillProps {
  children?: ReactNode;
  color?: SeverityPillColor;
  style?: {};
  sx?: SxProps<muiTheme>;
  size?: SeverityPillSize;
  isTag?: SeverityPillType;
  icon?: JSX.Element;
  left?: boolean;
  margin?: number;
}

interface SeverityPillRootProps {
  ownerState: {
    color: SeverityPillColor;
    size: SeverityPillSize;
    isTag: SeverityPillType;
    icon?: JSX.Element;
  };
}

const size = {
  extraSmall: {
    width: 25,
    height: 22,
  },
  small: {
    width: 33,
    height: 22,
  },
  medium: {
    width: 60,
    height: 40,
  },
  mediumSemi: {
    width: 110,
    height: 40,
  },
  mediumNarrow: {
    width: 78,
    height: 22,
  },
  mediumNarrowLong: {
    width: 100,
    height: 22,
  },
  mediumNarrowLonger: {
    width: 120,
    height: 22,
  },
  mediumLarge: {
    width: 136,
    height: 40,
  },
  large: {
    width: 187,
    height: 40,
  },
};

const SeverityPillRoot = styled("span")<SeverityPillRootProps>(
  ({ theme, ownerState }) => {
    const backgroundColor = theme.palette[ownerState.color]?.main;
    const color = theme.palette[ownerState.color]?.contrastText;
    const width = ownerState.isTag ? "" : size[ownerState.size]?.width;
    const height = size[ownerState.size]?.height;
    const borderRadius = ownerState.isTag ? 12 : 8;

    return {
      alignItems: "center",
      backgroundColor,
      borderRadius,
      color,
      cursor: "default",
      display: "inline-flex",
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: "center",
      letterSpacing: 0.5,
      minWidth: 20,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      whiteSpace: "nowrap",
      width,
      height,
    };
  }
);

export const SeverityPill: FC<SeverityPillProps> = (props) => {
  const {
    color = "primary",
    size = "small",
    isTag = false,
    icon,
    left,
    margin,
    children,
    ...other
  } = props;

  const ownerState = { color, size, isTag, icon };

  return (
    <>
      {icon ? (
        <SeverityPillRoot ownerState={ownerState} {...other}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {left ? (
              <>
                {icon}
                <Box sx={{ ml: margin || 0 }}>{children}</Box>
              </>
            ) : (
              <>
                <Box sx={{ mr: 1 }}>{children}</Box>
                {icon}
              </>
            )}
          </Box>
        </SeverityPillRoot>
      ) : (
        <SeverityPillRoot ownerState={ownerState} {...other}>
          {children}
        </SeverityPillRoot>
      )}
    </>
  );
};

SeverityPill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "warning",
    "success",
  ]),
};

export default SeverityPill;
