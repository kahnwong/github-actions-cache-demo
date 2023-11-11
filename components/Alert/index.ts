import { IOptionsAlert } from 'interfaces/Alert'
import Swal, { SweetAlertOptions } from 'sweetalert2'

export const fireAlert = (props: SweetAlertOptions) =>
  Swal.fire({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn-block btn-rounded px-5 btn-xl btn-primary',
      cancelButton: 'btn-block btn-rounded px-5 btn-xl btn-light'
    },
    ...props
  })

export const successAlert = (
  props: SweetAlertOptions,
  options?: IOptionsAlert
) =>
  Swal.fire({
    icon: 'success',
    showConfirmButton: true,
    timer: 40000,
    customClass: {
      confirmButton: 'px-5 bg-secondary',
      title: options?.small ? 'h2' : 'h4'
    },
    ...props
  })

export const failedAlert = (
  props: SweetAlertOptions,
  options?: IOptionsAlert
) =>
  Swal.fire({
    ...props,
    icon: 'error',
    showConfirmButton: true,
    timer: 40000,
    customClass: {
      confirmButton: 'px-5 bg-secondary',

      title: options?.small ? 'h2' : 'h4'
    }
  })

export const ListingAlert = Swal.mixin({
  showCancelButton: true,
  showConfirmButton: false
})

export const loadingAlert = (props?: SweetAlertOptions) =>
  Swal.fire({
    ...props,
    showConfirmButton: false,
    showCancelButton: false,
    background: `rgba(255,255,255,0)`,
    title: 'Loading...'
  })
