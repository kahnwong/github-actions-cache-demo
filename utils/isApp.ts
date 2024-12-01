const isApp = () => {
  // @ts-ignore
  const apps = navigator.userAgent || navigator.vendor || window.opera
  return (
    apps.indexOf('FBAN') > -1 ||
    apps.indexOf('FBAV') > -1 ||
    apps.indexOf('Messenger') > -1 ||
    apps.indexOf('Line') > -1 ||
    apps.indexOf('Twitter') > -1 ||
    apps.indexOf('Instagram') > -1
  )
}
export default isApp
