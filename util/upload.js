import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: 'AKIAQZEUPQDBRYVJBDC4',
  secretAccessKey: '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',
})

export const upload = (fileName, file) => {
  new AWS.S3({
    params: { Bucket: 'griffon-octane' },
    region: 'us-east-1',
  }).putObject(
    {
      ACL: 'public-read',
      Key: fileName,
      ContentType: file.type,
      Body: file,
    },
    (res, err) => {
      console.log(res)
      console.log(err)
    }
  )
}

export const uploadTeamImage = (input) => {
  const file = input.current.files[0]
  upload(`teams/${file.name}`, file)
}

export const uploadEventImage = (input) => {
  const file = input.current.files[0]
  upload(`events/${file.name}`, file)
}
