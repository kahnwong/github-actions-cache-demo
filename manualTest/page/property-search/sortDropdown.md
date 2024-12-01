1. api: /api/job_with_share

    test function:
    ```js
   const response =

   console.log(response.payload.map((job) => {
   return {
   id: job.id,
   projectNameTh: job.projectNameTh,
   isSoldOut: job.isSoldOut,
   updateDate: job.updatedDate,
   startingPrice: job.unitLocalStartingPrice,
   sharePrice: job.sharePrice,
   commissionPrice: job.commissionPrice,
   commissionPercentage: job.commissionPercentage,
     }
    })
   )
   ```
