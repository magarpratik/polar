import { getCentsInDollarString } from '@/utils/money'
import { Issue } from '@polar-sh/sdk'

const PolarLogo = () => {
  return (
    <svg
      width="72"
      height="26"
      viewBox="0 0 72 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.1953 18.652V6.47373H34.0492C34.6872 6.47373 35.2671 6.63611 35.789 6.96087C36.3109 7.27402 36.7227 7.70896 37.0242 8.26569C37.3374 8.82241 37.494 9.44292 37.494 10.1272C37.494 10.8347 37.3374 11.4726 37.0242 12.041C36.7227 12.6093 36.3109 13.0616 35.789 13.398C35.2671 13.7343 34.6872 13.9025 34.0492 13.9025H30.7089V18.652H29.1953ZM30.7089 12.4237H34.084C34.432 12.4237 34.7451 12.3251 35.0235 12.1279C35.3019 11.9192 35.5222 11.6408 35.6846 11.2929C35.847 10.9449 35.9282 10.5564 35.9282 10.1272C35.9282 9.70969 35.847 9.33854 35.6846 9.01378C35.5222 8.68903 35.3019 8.42806 35.0235 8.23089C34.7451 8.03372 34.432 7.93513 34.084 7.93513H30.7089V12.4237Z"
        fill="white"
      />
      <path
        d="M43.0997 18.826C42.2066 18.826 41.4063 18.623 40.6988 18.2171C40.0029 17.7996 39.452 17.237 39.046 16.5295C38.6401 15.8104 38.4371 14.9928 38.4371 14.0765C38.4371 13.1602 38.6401 12.3483 39.046 11.6408C39.452 10.9333 40.0029 10.3766 40.6988 9.97065C41.4063 9.56471 42.2066 9.36173 43.0997 9.36173C43.9927 9.36173 44.7872 9.56471 45.4831 9.97065C46.1906 10.3766 46.7415 10.9333 47.1359 11.6408C47.5418 12.3483 47.7448 13.1602 47.7448 14.0765C47.7448 14.9928 47.5418 15.8104 47.1359 16.5295C46.7415 17.237 46.1906 17.7996 45.4831 18.2171C44.7872 18.623 43.9927 18.826 43.0997 18.826ZM43.0997 17.469C43.7144 17.469 44.2595 17.324 44.735 17.0341C45.2106 16.7325 45.5817 16.3266 45.8485 15.8162C46.1268 15.3059 46.2602 14.726 46.2486 14.0765C46.2602 13.427 46.1268 12.8528 45.8485 12.3541C45.5817 11.8438 45.2106 11.4436 44.735 11.1537C44.2595 10.8637 43.7144 10.7187 43.0997 10.7187C42.4849 10.7187 41.934 10.8637 41.4469 11.1537C40.9713 11.4436 40.6002 11.8438 40.3334 12.3541C40.0667 12.8644 39.9333 13.4386 39.9333 14.0765C39.9333 14.726 40.0667 15.3059 40.3334 15.8162C40.6002 16.3266 40.9713 16.7325 41.4469 17.0341C41.934 17.324 42.4849 17.469 43.0997 17.469Z"
        fill="white"
      />
      <path d="M49.3345 18.652V5.77783H50.7959V18.652H49.3345Z" fill="white" />
      <path
        d="M56.5614 18.826C55.7843 18.826 55.0768 18.623 54.4389 18.2171C53.8126 17.7996 53.3139 17.2312 52.9427 16.5121C52.5716 15.793 52.386 14.9812 52.386 14.0765C52.386 13.1602 52.5774 12.3483 52.9601 11.6408C53.3429 10.9333 53.8532 10.3766 54.4911 9.97065C55.1406 9.56471 55.8655 9.36173 56.6658 9.36173C57.1414 9.36173 57.5763 9.43132 57.9706 9.57051C58.3766 9.70969 58.7361 9.90686 59.0493 10.162C59.3625 10.4056 59.6234 10.6955 59.8322 11.0319C60.041 11.3567 60.1801 11.7046 60.2497 12.0758L59.867 11.9018L59.8844 9.55311H61.3458V18.652H59.8844V16.4425L60.2497 16.2512C60.1685 16.5875 60.012 16.9123 59.78 17.2254C59.5596 17.5386 59.2813 17.817 58.9449 18.0605C58.6202 18.2925 58.2548 18.4781 57.8489 18.6172C57.4429 18.7564 57.0138 18.826 56.5614 18.826ZM56.9094 17.4516C57.5009 17.4516 58.0228 17.3066 58.4752 17.0167C58.9275 16.7267 59.2871 16.3324 59.5538 15.8336C59.8206 15.3233 59.954 14.7376 59.954 14.0765C59.954 13.427 59.8206 12.8528 59.5538 12.3541C59.2987 11.8554 58.9391 11.461 58.4752 11.1711C58.0228 10.8811 57.5009 10.7361 56.9094 10.7361C56.3179 10.7361 55.7959 10.8811 55.3436 11.1711C54.8913 11.461 54.5317 11.8554 54.265 12.3541C54.0098 12.8528 53.8822 13.427 53.8822 14.0765C53.8822 14.726 54.0098 15.3059 54.265 15.8162C54.5317 16.3266 54.8913 16.7267 55.3436 17.0167C55.7959 17.3066 56.3179 17.4516 56.9094 17.4516Z"
        fill="white"
      />
      <path
        d="M63.2234 18.652V9.55311H64.6848L64.7196 12.1106L64.563 11.6756C64.6906 11.2465 64.8994 10.8579 65.1894 10.51C65.4793 10.162 65.8215 9.88366 66.2158 9.67489C66.6218 9.46612 67.0509 9.36173 67.5032 9.36173C67.7004 9.36173 67.886 9.37913 68.06 9.41393C68.2455 9.43712 68.3963 9.47192 68.5123 9.51831L68.1122 11.1363C67.9614 11.0667 67.8048 11.0145 67.6424 10.9797C67.48 10.9449 67.3293 10.9275 67.1901 10.9275C66.8189 10.9275 66.4768 10.9971 66.1636 11.1363C65.8621 11.2755 65.6011 11.4668 65.3807 11.7104C65.172 11.9424 65.0038 12.2149 64.8762 12.5281C64.7602 12.8413 64.7022 13.1776 64.7022 13.5372V18.652H63.2234Z"
        fill="white"
      />
      <path
        d="M20.7706 17.7793C17.9171 21.9948 12.1866 23.0989 7.97111 20.2453C3.75566 17.3918 2.65161 11.6613 5.50512 7.44585C8.35864 3.2304 14.0892 2.12634 18.3046 4.97986C22.5201 7.83338 23.6241 13.5639 20.7706 17.7793Z"
        fill="white"
      />
      <path
        d="M20.1181 16.1843C17.9401 20.4414 13.0485 22.2933 9.19243 20.3204C5.33634 18.3476 3.97599 13.2972 6.15401 9.04006C8.33202 4.7829 13.2236 2.93108 17.0797 4.9039C20.9358 6.87672 22.2962 11.9271 20.1181 16.1843Z"
        fill="#0062FF"
      />
      <path
        d="M19.4375 14.6428C17.8671 19.4677 13.7723 22.4606 10.2915 21.3276C6.81068 20.1947 5.26197 15.365 6.83235 10.5401C8.40273 5.71527 12.4975 2.72238 15.9784 3.85531C19.4592 4.98824 21.0079 9.81797 19.4375 14.6428Z"
        fill="white"
      />
      <path
        d="M18.4711 13.7498C17.4876 18.3606 14.3023 21.5891 11.3565 20.9607C8.41067 20.3324 6.81984 16.0853 7.80329 11.4745C8.78674 6.86365 11.9721 3.63521 14.9179 4.26353C17.8637 4.89186 19.4545 9.13901 18.4711 13.7498Z"
        fill="#0062FF"
      />
      <path
        d="M17.3561 13.0445C16.8178 18.0852 14.4934 21.97 12.1644 21.7213C9.83539 21.4726 8.38367 17.1847 8.92191 12.1439C9.46015 7.10318 11.7845 3.21845 14.1136 3.46714C16.4426 3.71583 17.8943 8.00376 17.3561 13.0445Z"
        fill="white"
      />
      <path
        d="M16.1864 12.5656C16.2525 16.7481 14.9396 20.1602 13.2541 20.1869C11.5686 20.2135 10.1486 16.8445 10.0825 12.662C10.0165 8.47955 11.3293 5.0674 13.0148 5.04077C14.7003 5.01414 16.1203 8.38312 16.1864 12.5656Z"
        fill="#0062FF"
      />
    </svg>
  )
}

export const FundOurBacklog = ({
  issues,
  issueCount,
}: {
  issues: Issue[]
  issueCount: number
}) => {
  const showIssues = issues.slice(0, 5)

  const showShadow = showIssues.length > 2

  return (
    <div
      style={{
        display: 'flex',
        color: '#181a1f',
        background: 'white',
        width: '650px',
        border: '1px solid #E5E5E1',
        borderRadius: '11px',
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: '20px 20px',
          borderBottom: '1px solid #E5E5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: '600',
            display: 'flex',
          }}
        >
          Fund our backlog
        </div>
        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontWeight: '500',
              color: '#181a1f',
            }}
          >
            {issueCount}
          </div>
          <div
            style={{
              display: 'flex',
              color: '#727374',
            }}
          >
            {issues.length === 1 ? 'issue' : 'issues'}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px 20px',
        }}
      >
        {showIssues.map((i) => (
          <div
            key={i.id}
            style={{ display: 'flex', fontSize: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                fontWeight: '600',
                display: 'flex',
                width: '420px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0 10px 0 0 ',
              }}
            >
              {i.title}
            </div>

            <div
              style={{
                color: '#808080',
                alignItems: 'center',
                display: 'flex',
                gap: '4px',
                flexGrow: '1',
              }}
            >
              <div
                style={{
                  height: '18px',
                  width: '18px',
                  display: 'flex',
                }}
              >
                <ThumbsUp />
              </div>
              <div style={{ display: 'flex' }}>{i.reactions?.plus_one}</div>
            </div>

            <div
              style={{
                width: '140px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  border:
                    i.funding.pledges_sum?.amount &&
                    i.funding.pledges_sum?.amount > 0
                      ? '1px solid #C9DBF4'
                      : '1px solid #E5E5E1',
                  borderRadius: '30px',
                  background:
                    i.funding.pledges_sum?.amount &&
                    i.funding.pledges_sum?.amount > 0
                      ? '#E1EAF8'
                      : 'white',
                  padding: '2px 6px',

                  color:
                    i.funding.pledges_sum?.amount &&
                    i.funding.pledges_sum?.amount > 0
                      ? '#5982D7'
                      : '#727374',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    fontWeight: '500',
                    display: 'flex',
                    color:
                      i.funding.pledges_sum?.amount &&
                      i.funding.pledges_sum?.amount > 0
                        ? '#3851AD'
                        : '#505153',
                  }}
                >
                  $
                  {getCentsInDollarString(
                    i.funding.pledges_sum?.amount || 0,
                    false,
                    true,
                  )}
                </div>

                {i.funding.funding_goal?.amount && (
                  <div
                    style={{
                      display: 'flex',
                      padding: '0 0 0 4px',
                    }}
                  >
                    / $
                    {getCentsInDollarString(
                      i.funding.funding_goal?.amount,
                      false,
                      true,
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showShadow && (
        <div
          style={{
            background:
              'linear-gradient(180deg, rgba(254, 253, 249, 0) 0%, #FEFDF9 100%)',
            height: '100px',
            width: '100%',
            position: 'absolute',
            bottom: '80px',
          }}
        ></div>
      )}

      <div
        style={{
          display: 'flex',
          padding: '0 20px 20px 20px',
        }}
      >
        <div
          style={{
            background: '#0062FF',
            color: 'white',
            borderRadius: '10px',
            height: '44px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '15px',
            fontWeight: '500',
            padding: '0 10px',
            width: '100%',
          }}
        >
          <div style={{ flexGrow: '1' }}></div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: '0',
              gap: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexShrink: '0',
                whiteSpace: 'nowrap',
              }}
            >
              Fund our backlog with
            </div>
            <PolarLogo />
          </div>
          <div
            style={{
              justifyContent: 'flex-end',
              flexGrow: '1',
              display: 'flex',
            }}
          >
            <RightArrow />
          </div>
        </div>
      </div>
    </div>
  )
}

const RightArrow = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.875 3.75L13.125 10L6.875 16.25"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const ThumbsUp = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      height={18}
      width={18}
    >
      <path
        fill="#FFDB5E"
        d="M34.956 17.916c0-.503-.12-.975-.321-1.404-1.341-4.326-7.619-4.01-16.549-4.221-1.493-.035-.639-1.798-.115-5.668.341-2.517-1.282-6.382-4.01-6.382-4.498 0-.171 3.548-4.148 12.322-2.125 4.688-6.875 2.062-6.875 6.771v10.719c0 1.833.18 3.595 2.758 3.885C8.195 34.219 7.633 36 11.238 36h18.044c1.838 0 3.333-1.496 3.333-3.334 0-.762-.267-1.456-.698-2.018 1.02-.571 1.72-1.649 1.72-2.899 0-.76-.266-1.454-.696-2.015 1.023-.57 1.725-1.649 1.725-2.901 0-.909-.368-1.733-.961-2.336.757-.611 1.251-1.535 1.251-2.581z"
      />
      <path
        fill="#EE9547"
        d="M23.02 21.249h8.604c1.17 0 2.268-.626 2.866-1.633.246-.415.109-.952-.307-1.199-.415-.247-.952-.108-1.199.307-.283.479-.806.775-1.361.775h-8.81c-.873 0-1.583-.71-1.583-1.583s.71-1.583 1.583-1.583H28.7c.483 0 .875-.392.875-.875s-.392-.875-.875-.875h-5.888c-1.838 0-3.333 1.495-3.333 3.333 0 1.025.475 1.932 1.205 2.544-.615.605-.998 1.445-.998 2.373 0 1.028.478 1.938 1.212 2.549-.611.604-.99 1.441-.99 2.367 0 1.12.559 2.108 1.409 2.713-.524.589-.852 1.356-.852 2.204 0 1.838 1.495 3.333 3.333 3.333h5.484c1.17 0 2.269-.625 2.867-1.632.247-.415.11-.952-.305-1.199-.416-.245-.953-.11-1.199.305-.285.479-.808.776-1.363.776h-5.484c-.873 0-1.583-.71-1.583-1.583s.71-1.583 1.583-1.583h6.506c1.17 0 2.27-.626 2.867-1.633.247-.416.11-.953-.305-1.199-.419-.251-.954-.11-1.199.305-.289.487-.799.777-1.363.777h-7.063c-.873 0-1.583-.711-1.583-1.584s.71-1.583 1.583-1.583h8.091c1.17 0 2.269-.625 2.867-1.632.247-.415.11-.952-.305-1.199-.417-.246-.953-.11-1.199.305-.289.486-.799.776-1.363.776H23.02c-.873 0-1.583-.71-1.583-1.583s.709-1.584 1.583-1.584z"
      />
    </svg>
  )
}
