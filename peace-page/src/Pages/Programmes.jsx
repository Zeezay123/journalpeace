import React, { useEffect, useState } from 'react'
import SecondHero from '../components/SecondHero.jsx'
import { FaArrowRight } from 'react-icons/fa'
import image from '../assets/articles-icon.svg'
import CallToAction from '../components/CallToAction.jsx'
import HowToApply from '../components/HowToApply.jsx'
import { Link } from 'react-router-dom'
import { Button, Card } from 'flowbite-react'

const Programmes = () => {
  const [journals, setJournals] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/journal/getjournals')
        const data = await res.json()
        if (!res.ok) {
          console.log('res not ok')
          return
        }
        setJournals(data.journals)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <main>
      <SecondHero
        title= 'Journal Articles'
        content='Read from our Multiple articles'
      />

      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:px-20 py-10">
        {journals &&
          journals.map((journal) => (
            <Card key={journal.id} className="shadow-md rounded-xl">
              <div className="flex justify-center">
                <img src={image} alt="" className="w-10 h-10" />
              </div>

              <h5 className="text-lg font-semibold text-center mt-2">
                {journal.filename}
              </h5>

              <div
                className="text-sm text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: journal.details }}
              ></div>

              <div className="flex justify-center mt-4">
                <Link to={`/journal/${journal.slug}`}>
                  <Button color="blue" size="sm">
                    Download <FaArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
      </section>

      <HowToApply />
      <CallToAction />
    </main>
  )
}

export default Programmes
