import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
  } from './ui/terminal'
  
  export function TerminalDemo() {
    return (
      <div className='h-full w-full absolute -bottom-20 -right-20'>   
      <Terminal>
        <TypingAnimation startOnView={true} >~&gt; cd  web_development</TypingAnimation>
        <TypingAnimation  startOnView={true} delay={1000} className='text-nowrap overflow-hidden'>~&gt; cd  scaffoldgen new **my-awesome-app** --template next-ts --style tailwind</TypingAnimation>     
        <TypingAnimation delay={2000} startOnView={true} className='text-nowrap overflow-hidden'>~&gt; cd  scaffoldgen generate **component** UserProfile --type rfc --path src/components</TypingAnimation>
        <TypingAnimation delay={4000} startOnView={true} className='text-nowrap overflow-hidden'>~&gt; cd  scaffoldgen create **route** auth --handler **login,register** --method post</TypingAnimation>
        <TypingAnimation delay={6000} startOnView={true} className='text-nowrap overflow-hidden'>~&gt; cd  scaffoldgen config set **default-lang** python</TypingAnimation>
  

  
        {/* <TypingAnimation className="text-muted-foreground">
          Success! Project initialization completed.
        </TypingAnimation>
  
        <TypingAnimation className="text-muted-foreground">
          You may now add components.
        </TypingAnimation> */}
      </Terminal>
      </div>
    )
  }
  