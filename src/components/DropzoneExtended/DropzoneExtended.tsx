import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Controller, FieldValues, RegisterOptions, UseFormReturn, useWatch } from "react-hook-form";
import { SxProps } from "@mui/system";
import {
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  Link,
  Stack,
  Theme,
  Typography,
  Box,
} from "@mui/material";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { FileDto } from "../../interfaces/FileDto";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { useConfirm } from "material-ui-confirm";
import { useAxiosLoader } from "../../hooks/useAxiosLoader";

export const apiFileDownloadEndpoint = process.env.REACT_APP_API_URL + "/file/download";

type DropzoneExtendedProps = {
  name: string;
  form: any & UseFormReturn<FieldValues, object>;
  disabled?: boolean;
  initRequest: (id: number) => Promise<AxiosResponse<FileDto>>;
  uploadRequest: (file: File, onProgress: (event: any) => void) => Promise<AxiosResponse<FileDto>>;
  rules?: Omit<RegisterOptions, string>;
};

function DropzoneExtended({ name, form, disabled = false, rules, initRequest, uploadRequest }: DropzoneExtendedProps) {
  const confirm = useConfirm();
  const loading = useAxiosLoader();

  const {
    control,
    formState: { errors },
  } = form;

  const fileId = useWatch({ control, name });

  const [error, setError] = useState<any>();

  const [file, setFile] = useState<FileDto>();
  const [progress, setProgress] = useState(0);

  const fileError = _.get(errors, `${name}`);
  useEffect(() => {
    setError(fileError);
  }, [fileError]);

  useEffect(() => {
    if (fileId) {
      (async () => {
        initRequest &&
          (await initRequest(fileId)
            .then(({ data }) => {
              setFile(data);
            })
            .catch(() => remove()));
      })();
    }
  }, [fileId]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setError({});
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = async (ev: ProgressEvent<FileReader>) => {
        setFile({ name: file.name, size: file.size, mimeType: file.type });

        uploadRequest &&
          (await uploadRequest(file, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
            .then(({ data }) => {
              setFile(data);
              form.setValue(name, data.fileId);
              form.trigger(name);
            })
            .catch(() => remove()));
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const remove = () => {
    acceptedFiles.flat(0);
    setFile(undefined);
    setError({});
    form.setValue(name, null);
  };

  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } = useDropzone({
    onDrop: onDrop,
    accept: ["application/pdf", "image/jpeg", "image/tiff"],
    onDropRejected: (rejections: FileRejection[]) => {
      rejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setError({
              message: "Файла не отговаря на изискването да бъде с размер до 28МБ.",
            });
          }

          if (err.code === "file-invalid-type") {
            setError({
              message: "Файла не отговаря на изискването да бъде от следните формати: pdf, jpg, jpeg, tif, tiff.",
            });
          }
        });
      });
    },
    maxSize: 28 * 1024 * 1024, // 28 MB
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    disabled: file !== undefined || disabled,
  });

  const disabledStyle = (theme: Theme, extraStyles?: SxProps): SxProps => {
    return {
      ...extraStyles,
      color: disabled ? theme.palette.text.disabled : theme.palette.secondary.main,
    };
  };

  const disabledTextStyle = (theme: Theme): SxProps => {
    return {
      color: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
    };
  };

  const dragDisabledStyle = (theme: Theme): SxProps => {
    return {
      p: 2,
      borderWidth: "2px",
      borderStyle: "dashed",
      borderColor: disabled
        ? theme.palette.text.disabled
        : isDragActive
        ? theme.palette.text.disabled
        : theme.palette.secondary.main,
      backgroundColor: isDragActive ? theme.palette.grey[100] : theme.palette.common.white,
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={() => (
        <Stack>
          <Box component="div" sx={(theme) => ({ ...dragDisabledStyle(theme) })} {...getRootProps()}>
            {file ? (
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={3} sx={{ ml: 1 }}>
                  {progress > 0 && progress < 99.99 ? (
                    <CircularProgressWithLabel value={progress} />
                  ) : loading && file.fileId === undefined ? (
                    <CircularProgress color="secondary" />
                  ) : file.mimeType === "application/pdf" ? (
                    <PictureAsPdfIcon sx={(theme) => ({ ...disabledStyle(theme, { fontSize: "45px" }) })} />
                  ) : (
                    <DocumentScannerIcon sx={(theme) => ({ ...disabledStyle(theme, { fontSize: "45px" }) })} />
                  )}
                  <Stack>
                    <Typography component="span">
                      {file.blobId ? (
                        <Link href={`${apiFileDownloadEndpoint}/${file.blobId}`} underline="always">
                          {file.name}
                        </Link>
                      ) : (
                        file.name
                      )}
                    </Typography>
                    <Typography component="span" fontSize="12px">
                      {file.size ? (file.size / 1024).toFixed(2) : 0} KB
                    </Typography>
                  </Stack>
                </Stack>
                {!disabled && (
                  <IconButton
                    onClick={() =>
                      confirm({ title: "Сигурни ли сте?" })
                        .then(() => remove())
                        .catch(() => {})
                    }
                    size="large"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                )}
              </Stack>
            ) : (
              <Stack spacing={1} alignItems="center">
                <input {...getInputProps()} />
                <CloudUploadIcon
                  sx={(theme) => ({ ...disabledStyle(theme, { fontSize: "50px", mt: "-10px" }) })}
                  color="secondary"
                />
                <Typography component="span" sx={(theme) => ({ ...disabledTextStyle(theme) })}>
                  Поставяне на файловото съдържание с плъзгане и пускане тук
                </Typography>
                <Typography component="span" sx={(theme) => ({ ...disabledTextStyle(theme) })}>
                  или
                </Typography>
                <Button startIcon={<DriveFolderUploadOutlinedIcon />} onClick={open} disabled={disabled}>
                  Избор на файл
                </Button>
              </Stack>
            )}
          </Box>
          {!!error && (
            <>
              <input
                type="text"
                error-anchor=""
                style={{ width: 0, height: 0, padding: 0, margin: 0, borderWidth: 0 }}
              />
              <FormHelperText sx={{ ml: "14px" }} error>
                {error.message}
              </FormHelperText>
            </>
          )}
        </Stack>
      )}
    />
  );
}

export default DropzoneExtended;
