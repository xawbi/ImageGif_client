// 'use server'
//
// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
// import { RatingDto } from "@/api/dto/rating.dto";
//
// const host: string | undefined = process.env.NEXT_PUBLIC_HOST
//
// export async function postRating(ratingObj: RatingDto) {
//   const token = cookies().get("_token")?.value
//   const url = `${host}/rating`
//   const formData = new FormData()
//   for (const rating in ratingObj) {
//     formData.append(rating, ratingObj[rating])
//   }
//   const res = await fetch(`${url}`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//     body: formData
//   })
//   if (res.ok) {
//     const data = await res.json()
//     console.log('Данные успешно отправлены на сервер:', data)
//   } else {
//     console.error('Ошибка при отправке данных на сервер:', res.status, res.statusText)
//   }
// }