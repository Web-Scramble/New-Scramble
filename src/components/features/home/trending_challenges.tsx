import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Challenge } from '@/types/challenge'
import { getAllChallenges } from '@/api/challenge'

interface SmallChallengeCardProps {
  imageUrl?: string
  title: string
  description: string
  onClick?: () => void
}

export const SmallChallengeCard = ({
  imageUrl,
  title,
  description,
  onClick,
}: SmallChallengeCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="flex cursor-pointer items-start gap-3 p-2 hover:shadow-md transition shadow-none border-none"
    >
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex-1">
        <CardHeader className="p-0 text-left">
          <CardTitle className="text-sm font-semibold leading-tight text-gray-500">
            {title}
          </CardTitle>
          <CardDescription className="mt-1 text-xs text-gray-400 line-clamp-2 font-normal">
            {description}
          </CardDescription>
        </CardHeader>
      </div>
    </Card>
  )
}


export default function TrendingChallenges() {

  const [challenges, setChallenges] = useState<Challenge[]>([])
    // const challenges = [
    //   {
    //     id: 1,
    //     imageUrl: '/images/image.png',
    //     title: 'Challenge Title',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    //     participants: 230,
    //     timeLeft: '2 days left',
    //   },
    //   {
    //     id: 2,
    //     imageUrl: '/images/image.png',
    //     title: 'Another Challenge',
    //     description: 'Suspendisse efficitur, lorem sed luctus gravida...',
    //     participants: 120,
    //     timeLeft: '5 days left',
    //   },
    // ]


    useEffect(() => {
      
     const fetchChallenges = async() => {

      try{
        const response = await getAllChallenges()
        setChallenges(response)
      } catch(err: any){
        console.log(err)
      }

     
     }

     fetchChallenges
    }, []);
  
    return (
        <section className="w-full max-w-md border rounded-lg bg-white">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800 text-left font-grotesk">Trending Challenges</h2>
            <Button 
              variant="ghost" 
              className="text-gray-500 font-normal"
            //   onClick={handleSeeAllClick}
            >
              See all
            </Button>
          </div>
      <div className="space-y-2">
        {challenges.map((ch) => (
          <SmallChallengeCard
            key={ch.id}
          //  imageUrl={ch.imageUrl}
            title={ch.title}
            description={ch.description}
            onClick={() => console.log('View challenge', ch.id)}
          />
        ))}
      </div>
      </div>
      </section>
    )
  }
  