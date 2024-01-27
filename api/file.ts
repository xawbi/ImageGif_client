'use server'
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const host: string | undefined = process.env.NEXT_PUBLIC_HOST

export async function getUserFile(type: string) {
  const token = cookies().get("_token")?.value
  const url = `${host}/files?type=${type}`
  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return res.json()
  }
}

export async function updateUserRestricted(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/files/${id}/updateRestricted`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  revalidatePath('/profile')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function delFile(id: number) {
  const token = cookies().get("_token")?.value
  const res = await fetch(`${host}/files/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  revalidatePath('/profile')
  if (!res.ok) {
    console.error(res.status, res.statusText)
  } else {
    return null
  }
}

export async function revalidateProfile() {
  revalidatePath('profile')
}

// export async function unloadFiles(fileStr: string, fileType: string, fileName: string, token: string | null) {
//   const data = Buffer.from(fileStr, 'base64')
//   const file = new Blob([data], {type: fileType})
//   try {
//     const formData = new FormData();
//     formData.append('file', file, fileName)
//     console.log(formData.get('file'))
//     const res = await fetch(`${host}/files`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });
//
//     if (res.ok) {
//       const data = await res.json()
//       console.log(`File uploaded successfully. Response: ${data}`)
//     } else {
//       console.error(`Error uploading file:`, res.status, res.statusText)
//     }
//   } catch (error) {
//     console.error(`Error uploading file:`, error);
//   }
// }

// const file = files[i]
//
// const reader = new FileReader();
// console.log(file)
//
// reader.onloadend = async () => {
//   const fileStr = reader.result as string;
//   await unloadFiles(fileStr, file.type, file.name, token)
// };
// reader.readAsDataURL(file);