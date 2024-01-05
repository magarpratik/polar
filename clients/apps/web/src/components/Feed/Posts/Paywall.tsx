import { Article } from '@polar-sh/sdk'
import Link from 'next/link'

const Paywall = (props: {
  children?: React.ReactNode
  showPaywalledContent: boolean
  isSubscriber: boolean
  article: Article
  renderer?: typeof BrowserPaywall
}) => {
  if (props.renderer) {
    const C = props.renderer
    return (
      <C
        showPaywalledContent={props.showPaywalledContent}
        isSubscriber={props.isSubscriber}
        article={props.article}
      />
    )
  }

  return (
    <BrowserPaywall
      showPaywalledContent={props.showPaywalledContent}
      isSubscriber={props.isSubscriber}
      article={props.article}
    >
      {props.children}
    </BrowserPaywall>
  )
}

const BrowserPaywall = (props: {
  showPaywalledContent: boolean
  isSubscriber: boolean
  article: Article
  children?: React.ReactNode
}) => {
  if (
    props.showPaywalledContent === false ||
    !props.children ||
    (Array.isArray(props.children) && props.children.length === 0)
  ) {
    return (
      <div className="dark:bg-polar-700 my-4 flex flex-col items-center rounded-3xl bg-gray-100 px-8 py-4">
        {props.isSubscriber ? (
          <p>
            This section is for premium subscribers only. Upgrade{' '}
            <Link href={`/${props.article.organization.name}/subscriptions`}>
              your subscription
            </Link>{' '}
            to a tier with the &quot;Paid Subscription&quot; benefit to get
            access to it.
          </p>
        ) : (
          <p>
            This section is for premium subscribers only. Subscribe to{' '}
            <strong>
              {props.article.organization.pretty_name ||
                props.article.organization.name}
            </strong>{' '}
            to get access to it.
          </p>
        )}
      </div>
    )
  }
  return <p>{props.children}</p>
}

export default Paywall
