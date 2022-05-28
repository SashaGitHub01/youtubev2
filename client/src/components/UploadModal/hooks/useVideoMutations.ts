import { useEffect, useState } from "react";
import { Query, useMutation, useQuery } from "react-query";
import { MediaApi } from "../../../API/MediaApi";
import { IMediaRes } from "../../../API/types";
import { VideoApi } from "../../../API/VideoApi";
import { useRouterQuery } from "../../../hooks/useRouterQuery";
import { IVideo, VideoInput } from "../../../types/video.types";
import { useUploadForm } from "./useUploadForm";

export const useVideoMutations = (
   setProgress: (num: number) => void,
   setVideo: any,
   setPreview: (url: string) => void,
   video?: IVideo,
) => {
   const { query, changeQuery } = useRouterQuery()

   const create = useMutation<IVideo, Error, VideoInput>(
      'create video',
      async (input: VideoInput) => {
         return await VideoApi.createVideo(input)
      },

      {
         onSuccess: (data) => {
            changeQuery({ id: data._id })
            setVideo(data)
         }
      }
   );

   const update = useMutation<IVideo, Error, { input: VideoInput, id: string }>(
      'update video',
      async ({ id, input }) => {
         return await VideoApi.updateVideo(id, input)
      },

      {
         onSuccess: (v) => {
            setVideo(v)
         }
      }
   )


   const uploadImage = useMutation<IMediaRes, Error, FormData>(
      'upload img',
      async (data: FormData) => await MediaApi.uploadPreview(data), {

      onSuccess: async (data) => {
         await update.mutateAsync({ input: { preview: data.url }, id: video?._id as string })
      },
   }
   );

   useEffect(() => {
      if (!video) return
      if (!!query?.id && !!query?.video && !video?.video) {
         update.mutateAsync({ input: { video: query.video as string }, id: query.id as string })
            .then((r) => setVideo(r))
      }
   }, [query?.video, query?.id, video])

   const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      const file = e.target.files?.[0];
      const name = file.name.split('.').slice(0, file.name.split('.').length - 1).join('');
      const formdata = new FormData()
      formdata.append('media', file)
      formdata.append('name', name)
      e.target.value = '';

      await upload.mutateAsync(formdata)
   }

   const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return;
      e.target.value = ''
      const formdata = new FormData()
      formdata.append('media', file)
      const blob = new Blob([file])
      setPreview(URL.createObjectURL(blob))

      await uploadImage.mutateAsync(formdata)
   }

   const form = useUploadForm({ video, update, })

   const upload = useMutation<IMediaRes, Error, FormData>(
      'upload video',
      async (data: FormData) => await MediaApi.uploadVideo(data, setProgress), {

      onError: form.onUploadError,

      onMutate: async (formdata) => {
         const data = Object.fromEntries(formdata)
         create.mutate({ name: data.name as string })
      },

      onSuccess: async (data) => {
         changeQuery({ video: data.url })
      },
   }
   );

   return { update, create, upload, onChange, onImageChange, uploadImage, form }
}