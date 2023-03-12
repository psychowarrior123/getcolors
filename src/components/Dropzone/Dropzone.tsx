import React, { memo, ReactNode } from "react";
import { DropzoneState } from "react-dropzone";
import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

// https://react-dropzone.js.org/

export const Dropzone: React.FC<{
  dropzone: DropzoneState;
  hidden?: boolean;
  errors?: string[];
  text?: string;
  height?: number;
  label?: string;
  required?: boolean;
  children?: ReactNode[];
}> = memo(({ dropzone, hidden, errors, children, text, height, label }) => {
  const theme = useTheme();
  const { getRootProps, getInputProps } = dropzone;
  return hidden ? (
    <input {...getInputProps()} />
  ) : (
    <Box>
      <DropzoneWrapper
        {...getRootProps()}
        isError={errors && errors?.length !== 0}
        height={height}
      >
        <>
          <input {...getInputProps()} />
          {children || (
            <Stack
              flexDirection="column"
              alignItems="center"
              spacing="8px"
              style={{ textAlign: "center" }}
            >
              <FileUploadOutlinedIcon />
              {label && (
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{
                    whiteSpace: "break-spaces",
                    [theme.breakpoints.down("sm")]: theme.typography.body2,
                  }}
                >
                  {label}
                </Typography>
              )}
              <Typography
                variant="body2"
                style={{ color: theme.palette.text.disabled }}
                sx={{
                  whiteSpace: "break-spaces",
                  [theme.breakpoints.down("sm")]: theme.typography.caption,
                }}
              >
                {text}
              </Typography>
            </Stack>
          )}
        </>
      </DropzoneWrapper>
      {errors && (
        <Stack flexDirection="column">
          {errors.map((error) => (
            <Typography
              variant="caption"
              color={theme.palette.error.main}
              sx={{ marginTop: 1 }}
            >
              {error}
            </Typography>
          ))}
        </Stack>
      )}
    </Box>
  );
});

const DropzoneWrapper = styled(Stack)<{ isError?: boolean; height?: number }>`
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 64px;
  height: ${({ height }) => height};
  border: 1px dashed
    ${({ isError, theme }) =>
      isError ? theme.palette.error.dark : theme.palette.text.primary};
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  transition: ${({ theme }) =>
    theme.transitions.create("all", {
      duration: theme.transitions.duration.standard,
    })};

  p {
    transition: ${({ theme }) =>
      theme.transitions.create("all", {
        duration: theme.transitions.duration.standard,
      })};
  }

  svg {
    path {
      transition: ${({ theme }) =>
        theme.transitions.create("all", {
          duration: theme.transitions.duration.standard,
        })};
      fill: ${({ theme }) => theme.palette.text.primary} !important;
    }
  }

  :hover {
    background: ${({ theme }) => theme.palette.action.hover};
    border: 1px dashed
      ${({ isError, theme }) =>
        isError ? theme.palette.error.dark : theme.palette.primary.main};

    p {
      color: ${({ theme }) => theme.palette.primary.dark};
    }

    svg {
      path {
        fill: ${({ theme }) => theme.palette.primary.main} !important;
      }
    }
  }
`;
