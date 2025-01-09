import React, { useState, useEffect } from "react"
import { Share2, BarChart2, Users, Grid, ChevronDown, ChevronUp, ArrowRight, Award, Briefcase, Book, Rocket } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const WhyRecruit = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Alumni Network",
      icon: <Share2 className="w-8 h-8 text-custom-blue" />,
      description:
        "Our alumni hold senior positions at highly respected institutions globally, showcasing the quality of education at NIT Jalandhar.",
      expanded:
        "Our alumni network spans across Fortune 500 companies, leading research institutions, and innovative startups. Notable achievements include leadership roles at major tech companies, groundbreaking research publications, and successful entrepreneurial ventures.",
    },
    {
      title: "National Ranking",
      icon: <BarChart2 className="w-8 h-8 text-custom-blue" />,
      description:
        "Ranked 52nd in Engineering and 85th overall in NIRF 2022. We stand 2nd in Punjab among all Government Engineering Institutes.",
      expanded:
        "Our consistent improvement in rankings reflects our commitment to academic excellence. We've shown remarkable progress in research output, faculty quality, and industry collaboration, receiving multiple awards for innovation and teaching excellence.",
    },
    {
      title: "Rigorous Selection",
      icon: <Users className="w-8 h-8 text-custom-blue" />,
      description:
        "We admit students through JEE MAINS, GATE, and other competitive exams, ensuring a pool of top-tier talent for recruiters.",
      expanded:
        "Our rigorous selection process ensures we admit only the brightest minds. The institute maintains high cutoff ranks, resulting in a highly competitive peer group. We also have special provisions for international students, promoting cultural diversity on campus.",
    },
    {
      title: "Holistic Development",
      icon: <Grid className="w-8 h-8 text-custom-blue" />,
      description:
        "With 15 departments and 10 student clubs, we focus on both technical expertise and soft skills development.",
      expanded:
        "Our comprehensive development approach includes technical workshops, soft skills training, and leadership programs. Students participate in national and international competitions, securing top positions. We offer state-of-the-art laboratories and innovation centers for hands-on learning.",
    },
  ]

  const achievements = [
    { icon: Briefcase, text: "Placement rate for graduating students", value: 90 },
    { icon: Book, text: "Research papers published annually", value: 50 },
    { icon: Award, text: "Patents filed in the last 5 years", value: 20 },
    { icon: Share2, text: "Industry collaborations", value: 100 },
    { icon: Rocket, text: "Startups incubated on campus", value: 30 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6 text-custom-blue tracking-tight">Why Recruit From NIT Jalandhar?</h1>
          <p className="text-lg font-semibold text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 1987, NIT Jalandhar has been shaping the future of technology and innovation. Our alumni are making waves globally, 
            holding key positions in respected institutions and driving technological advancements.
          </p>
        </motion.div>

        <Tabs defaultValue="stats" className="mb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="stats" 
              className="data-[state=active]:bg-custom-blue data-[state=active]:text-white transition rounded-lg"
            >
              Key Statistics
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className="data-[state=active]:bg-custom-blue data-[state=active]:text-white transition rounded-lg"
            >
              Our Achievements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{stat.description}</CardDescription>
                    <AnimatePresence>
                      {expandedSection === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="mt-4 text-sm text-gray-500">{stat.expanded}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Button
                      variant="ghost"
                      className="mt-4 w-full justify-between"
                      onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    >
                      {expandedSection === index ? "Show Less" : "Learn More"}
                      {expandedSection === index ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="achievements">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 bg-white text-white rounded-lg p-8 shadow-xl"
            >
              <h2 className="text-3xl font-bold mb-6 text-custom-blue">Our Excellence</h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed font-semibold">
                NIT Jalandhar boasts a faculty of distinguished PhD holders from renowned institutions. With substantial government funding, 
                we're at the forefront of technological education in India. Our consistent rise in national rankings is a testament to our 
                commitment to excellence in education, research, and innovation.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-custom-blue rounded-lg p-6 transition-all duration-300 hover:bg-cusom-blue-dark">
                    <div className="flex items-center mb-4">
                      <achievement.icon className="w-8 h-8 text-white mr-4" />
                      <span className="font-semibold text-lg">{achievement.text}</span>
                    </div>
                    <div className="flex items-center">
                      <Progress value={progress} className="flex-grow h-2" indicatorColor="bg-yellow-400" />
                      <span className="ml-4 text-2xl font-bold text-white">{achievement.value}+</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center bg-white p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-4xl font-bold text-custom-blue mb-6">Ready to Recruit Top Talent?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the ranks of leading companies who have found their star performers at NIT Jalandhar. 
            Our graduates are ready to drive innovation and excellence in your organization.
          </p>
          <Button size="lg" className="bg-custom-blue hover:bg-custom-blue text-lg px-8 py-4 text-white">
            Get in Touch <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default WhyRecruit;