/* eslint-disable no-console */
import AWS from 'aws-sdk'

export const upload = async (fileName, file) => {
  try {
    const res = await new AWS.S3({
      params: { Bucket: 'griffon-octane' },
      region: 'us-east-1',
    })
      .putObject({
        ACL: 'public-read',
        Key: fileName,
        ContentType: file.type,
        Body: file,
      })
      .promise()
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}

export const list = async (path) => {
  try {
    const res = await new AWS.S3()
      .listObjectsV2({
        Bucket: 'griffon-octane',
        Prefix: path,
      })
      .promise()
    return res.Contents?.map((p) => p.Key.split('/')[1]).slice(1) || []
  } catch (err) {
    console.error(err)
  }

  return []
}

export const uploadTeamImage = async (input) => {
  const file = input.current.files[0]
  await upload(`teams/${file.name}`, file)
}

export const uploadEventImage = async (input) => {
  const file = input.current.files[0]
  await upload(`events/${file.name}`, file)
}

export const listEventImages = async () => list('events/')
