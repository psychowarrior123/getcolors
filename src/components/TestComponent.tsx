import React, { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Dropzone, useDropzoneConfig } from "components/Dropzone";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";

const Vibrant = require("node-vibrant");

export const TestComponent: FC = () => {
  const [colors, setColors] = useState<{ key: string; color: string }[]>([]);
  const [fileUrl, setFileUrl] = useState<string>();
  const colorRef = useRef<Element>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation("common");
  const { files, onDrop, stringErrors, setFiles, setErrors } =
    useDropzoneConfig(1, 10);
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const dropzone = useDropzone({
    onDrop,
    maxSize: 10485760,
    accept: {
      "image/*": [],
    },
  });

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      setFileUrl(ev.target?.result as string);
      const vibrant = new Vibrant(ev.target?.result as string, {
        quality: 0,
      });
      const palette = await vibrant.getPalette();
      setColors(
        Object.keys(palette).map((key) => ({
          key,
          color: palette[key].hex,
        }))
      );
    };

    if (files && files.length !== 0) {
      reader.readAsDataURL(files[0]?.file as Blob);
    }
  }, [files]);

  return (
    <Stack py={8} spacing={4}>
      <Box
        sx={{
          height:
            files && files.length !== 0 ? buttonRef.current?.offsetHeight : 0,
          opacity: files && files.length !== 0 ? 1 : 0,
          overflow: "hidden",
          width: "100%",
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setFiles([]);
            setErrors([]);
            setFileUrl("");
            setColors([]);
          }}
          fullWidth
          ref={buttonRef}
        >
          Сбросить изображение
        </Button>
      </Box>
      <Dropzone
        dropzone={dropzone}
        errors={stringErrors}
        height={140}
        text="Не прикладывайте файлы больше 10 мб."
        label="Выберите или перетащите файл в область"
      />
      <Stack spacing={3} alignItems="center">
        <Stack
          sx={{
            width: "100%",
            "& > img": {
              borderRadius: 2,
              objectFit: "contain",
              maxWidth: imageRef.current?.offsetWidth,
            },
          }}
          alignItems="center"
          ref={imageRef}
        >
          <img src={fileUrl} />
        </Stack>
        <Box
          display="grid"
          sx={{
            gap: 1,
            gridTemplateColumns: "repeat(6, 1fr)",
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            width: "100%",
          }}
          ref={colorRef}
        >
          {colors.map(({ key, color }) => (
            <>
              <Stack
                spacing={1}
                alignItems="center"
                key={key}
                sx={{
                  cursor: "pointer",
                  py: 2,
                  borderRadius: 2,
                  transition: (theme) =>
                    theme.transitions.create("all", {
                      duration: theme.transitions.duration.standard,
                    }),
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
                onClick={() => {
                  setOpen(true);
                  navigator.clipboard.writeText(color);
                }}
              >
                <Box
                  width={72}
                  height={72}
                  bgcolor={color}
                  sx={{ border: "1px solid black", borderRadius: 1 }}
                />
                <Typography variant="caption" textAlign="center">
                  {t(`colors.${key}`)}: {color}
                </Typography>
              </Stack>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                onClose={() => {
                  setOpen(false);
                }}
                message={t("colorCopied", { color })}
              />
            </>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
