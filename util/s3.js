/* eslint-disable no-console */
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: 'AKIAQZEUPQDBRYVJBDC4',
  secretAccessKey: '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',
})

const s3Client = new AWS.S3({
  params: { Bucket: 'griffon-octane' },
  region: 'us-east-1',
})

export const upload = async (fileName, file) => {
  try {
    const res = await s3Client
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

export const uploadTeamImage = async (input) => {
  const file = input.current.files[0]
  await upload(`teams/${file.name}`, file)
}

export const uploadEventImage = async (input) => {
  const file = input.current.files[0]
  await upload(`events/${file.name}`, file)
}
