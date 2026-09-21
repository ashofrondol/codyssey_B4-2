import styles from './Button.module.css'

/**
 * 쓸 수 있는 variant 의 목록. CSS 파일이 아니라 이 표가 정답이다.
 * (CSS 클래스가 지워져도, 오타가 들어와도 아래 검사가 똑같이 잡아낸다.)
 */
const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  ghost: styles.ghost,
}

const DEFAULT_VARIANT = 'primary'

export default function Button({
  children,
  variant = DEFAULT_VARIANT,
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) {
  let variantClass = VARIANT_CLASS[variant]

  // 예전에는 `styles[variant] ?? ''` 였다. `variant="primry"` 오타가 아무 경고 없이
  // 스타일만 사라지게 했고, 화면을 보기 전까지 아무도 몰랐다. 이제 개발 모드에서
  // 콘솔에 에러로 남고, 화면은 기본 variant 로 떨어져 눈에도 띈다.
  if (!variantClass) {
    if (import.meta.env.DEV) {
      console.error(
        `[Button] 알 수 없는 variant: ${JSON.stringify(variant)}. ` +
          `사용 가능: ${Object.keys(VARIANT_CLASS).join(', ')}. ` +
          `'${DEFAULT_VARIANT}' 로 대체합니다.`,
      )
    }
    variantClass = VARIANT_CLASS[DEFAULT_VARIANT]
  }

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? '처리 중…' : children}
    </button>
  )
}
