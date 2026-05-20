import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "About Us | FYTBYRAJ",
  description:
    "Learn about Rituraj Sharma, FYTBYRAJ, and his fitness, nutrition, Ayurveda, and holistic wellness journey.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <SiteHeader />
        <div className="about-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light">About Us</p>
            <h1>FYTBYRAJ is a vision for fitness, nutrition and wellness.</h1>
            <p>
              Rituraj Sharma runs FYTBYRAJ, a growing fitness and wellness
              platform dedicated to helping individuals achieve healthier
              lifestyles through proper nutrition, sustainable fitness
              practices, and holistic wellness solutions.
            </p>
          </div>
          <figure className="about-hero__image">
            <Image
              src="/assets/rituraj-editorial-seated.jpg"
              alt="Rituraj Sharma premium editorial portrait"
              width={6720}
              height={4480}
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </figure>
        </div>
      </section>

      <section className="content-band content-band--white">
        <article className="about-story">
          <p className="about-story__lead">
            Rituraj Sharma runs FYTBYRAJ, a growing fitness and wellness
            platform dedicated to helping individuals achieve healthier
            lifestyles through proper nutrition, sustainable fitness practices,
            and holistic wellness solutions. With more than 10 years of
            experience in the field of diet, nutrition, fitness, and health
            transformation, Rituraj Sharma has established himself as a trusted
            name in the wellness industry.
          </p>

          <p>
            What makes his journey truly inspiring is that it is built upon
            personal experience and transformation. Rituraj Sharma himself
            underwent a remarkable weight transformation from 102 kg to 78 kg
            through disciplined nutrition, lifestyle changes, fitness routines,
            and consistency. This personal success story became the driving
            force behind his passion for helping others overcome their own
            health struggles and achieve long-term wellness naturally and
            sustainably.
          </p>

          <div className="about-split">
            <figure className="about-split__image">
              <Image
                src="/assets/rituraj-boby-devol.jpg"
                alt="Rituraj Sharma receiving wellness industry recognition"
                width={853}
                height={985}
                sizes="(max-width: 900px) 100vw, 34vw"
              />
            </figure>
            <div>
              <h2>Experience shaped by ventures and recognition.</h2>
              <p>
                Over the years, Rituraj Sharma has successfully built and
                managed multiple ventures in the health and nutrition industry,
                including FITOJA, FYTBYRAJ, and Hindustan Food. Through these
                ventures, he has worked extensively in areas such as weight
                management, customized diet consultation, natural wellness
                support, lifestyle coaching, Ayurveda-inspired nutrition, and
                preventive healthcare solutions.
              </p>
              <p>
                His contribution to the fitness and wellness industry has earned
                him recognition on multiple media and public platforms. He has
                appeared in numerous television shows and wellness discussions,
                with one of his notable appearances being on Bharat Ke
                Superfounders, where his entrepreneurial and wellness journey
                received appreciation and recognition.
              </p>
            </div>
          </div>

          <p>
            Rituraj Sharma believes that health transformation should not rely
            on unrealistic methods or temporary solutions. His philosophy
            focuses on creating practical, sustainable, and balanced lifestyle
            habits that individuals can follow comfortably in their day-to-day
            lives. His programs and wellness guidance are designed to help
            people not only lose weight but also improve energy levels,
            confidence, overall health, and quality of life.
          </p>

          <p>
            Due to his dedication and impactful work in the wellness field,
            Rituraj Sharma has also received several awards and accolades,
            including prestigious recognitions such as the title of Best
            Nutritionist of the Year. These honors reflect his commitment toward
            helping people transform their lifestyles through informed nutrition
            and holistic wellness practices.
          </p>

          <p>
            Academically, Rituraj Sharma possesses strong educational
            qualifications in the field of health and nutrition. He holds a
            3-year diploma in Diet and Nutrition along with certifications in
            Ayurveda, allowing him to combine modern nutritional science with
            traditional Indian wellness principles. His approach integrates
            balanced diets, mindful eating, herbal wellness support, and
            lifestyle management to deliver sustainable health results.
          </p>

          <p>
            Apart from being a wellness entrepreneur and nutrition professional,
            Rituraj Sharma is also known for motivating and inspiring people to
            adopt healthier lifestyles. His mission is to spread awareness about
            preventive healthcare, balanced nutrition, and the importance of
            maintaining physical and mental wellness through disciplined yet
            realistic habits.
          </p>

          <p>
            Today, through FYTBYRAJ and his associated wellness ventures,
            Rituraj Sharma continues to guide and inspire people across
            different age groups and lifestyles. With a unique combination of
            personal transformation, professional expertise, entrepreneurial
            vision, and holistic wellness knowledge, he remains dedicated to
            helping individuals become healthier, fitter, and more confident
            versions of themselves.
          </p>
        </article>
      </section>
    </main>
  );
}
