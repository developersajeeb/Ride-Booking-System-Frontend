import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Users, Award, Linkedin, Twitter } from "lucide-react";

const AboutUs = () => {
  // Company data
  const companyData = {
    name: "RideEase",
    founded: "2018",
    headquarters: "San Francisco, CA",
    description: "RideEase was founded with a simple mission: to make transportation accessible, affordable, and reliable for everyone. What started as a small startup with just three drivers has now grown into a global platform serving millions of riders across 50+ cities worldwide.",
    stats: [
      { icon: <Users className="h-6 w-6" />, value: "10M+", label: "Happy Riders" },
      { icon: <MapPin className="h-6 w-6" />, value: "50+", label: "Cities Worldwide" },
      { icon: <Calendar className="h-6 w-6" />, value: "5", label: "Years of Service" },
      { icon: <Award className="h-6 w-6" />, value: "98%", label: "Satisfaction Rate" }
    ]
  };

  // Mission statement
  const missionStatement = {
    title: "Our Mission",
    content: "To revolutionize urban mobility by creating a seamless, sustainable, and safe transportation network that connects communities and improves lives. We believe in the power of technology to solve real-world problems and are committed to reducing traffic congestion, lowering carbon emissions, and providing economic opportunities for drivers worldwide.",
    values: [
      { title: "Safety", description: "Passenger and driver safety is our top priority in every decision we make." },
      { title: "Sustainability", description: "We're committed to reducing our environmental footprint through green initiatives." },
      { title: "Innovation", description: "Continuously improving our technology to serve you better." },
      { title: "Community", description: "Building connections that strengthen the neighborhoods we serve." }
    ]
  };

  // Team members
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Co-Founder",
      bio: "With over 15 years in tech and transportation, Sarah leads our vision for a more connected world.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Chen",
      position: "CTO & Co-Founder",
      bio: "Michael's expertise in scalable systems has been crucial in building our reliable platform.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Jamal Williams",
      position: "Head of Operations",
      bio: "Jamal ensures our services run smoothly across all markets with his operational excellence.",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Elena Rodriguez",
      position: "VP of Marketing",
      bio: "Elena's creative campaigns have helped us grow our user base exponentially year after year.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "David Kim",
      position: "Head of Product",
      bio: "David focuses on user experience, ensuring our app is intuitive and delightful to use.",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Aisha Patel",
      position: "Director of Safety",
      bio: "Aisha develops and implements our industry-leading safety protocols and driver training programs.",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-[1300px] mx-auto pb-20 pt-28 md:pb-32 md:pt-40">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Connecting People and Places
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn about our journey, mission, and the team behind {companyData.name}
          </p>
        </section>

        {/* Company Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyData.stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Background */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founded in {companyData.founded} and headquartered in {companyData.headquarters}, {companyData.name} has transformed the way people move around cities.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {companyData.description}
              </p>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl h-80 flex items-center justify-center shadow-lg">
              <div className="text-center text-white p-6">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-xl">Cities Worldwide</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{missionStatement.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {missionStatement.content}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionStatement.values.map((value, index) => (
              <Card key={index} className="h-full border-0 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate individuals behind {companyData.name}'s success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="h-64 bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16 dark:bg-gray-700" />

        {/* CTA Section */}
        <section className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
          <h2 className="text-3xl font-bold mb-4 text-white">Join Our Journey</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Whether you're looking to ride with us, drive with us, or join our team, we'd love to have you as part of the {companyData.name} community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition">
              Download App
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition">
              Become a Driver
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;