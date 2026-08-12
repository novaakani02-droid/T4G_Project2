/* AbleSpace — Find a Therapist directory data
   Sample/placeholder therapist profiles for demonstration purposes only.
   Photos are generic placeholder headshots, not real practitioners. */

const THERAPISTS = [
  {
    id: 't01', name: 'Dr. Ama Boateng', credentials: 'OTD, OTR/L',
    specialty: 'Stroke & Neuro Rehabilitation', specialtyTag: 'neuro',
    region: 'Greater Accra', years: 14, rating: 4.9, reviews: 132,
    availability: 'Accepting',
    bio: 'Focuses on regaining independence in daily activities after stroke and other neurological events, blending clinical technique with practical home strategies.',
    phone: '+233 24 555 0142', email: 'ama.boateng@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=47'
  },
  {
    id: 't02', name: 'Kwame Asante', credentials: 'MSc OT, OTR/L',
    specialty: 'Pediatric Occupational Therapy', specialtyTag: 'pediatric',
    region: 'Ashanti Region', years: 9, rating: 4.8, reviews: 96,
    availability: 'Accepting',
    bio: 'Works with children on sensory processing, fine motor development, and school-readiness skills, using play-based, family-centred sessions.',
    phone: '+233 20 555 0187', email: 'kwame.asante@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=12'
  },
  {
    id: 't03', name: 'Dr. Linda Owusu', credentials: 'OTD, CHT',
    specialty: 'Hand & Upper Limb Rehabilitation', specialtyTag: 'hand',
    region: 'Greater Accra', years: 17, rating: 5.0, reviews: 210,
    availability: 'Waitlist',
    bio: 'Certified Hand Therapist specialising in post-fracture and post-surgical hand rehabilitation, splinting, and fine-motor recovery.',
    phone: '+233 24 555 0198', email: 'linda.owusu@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=32'
  },
  {
    id: 't04', name: 'Samuel Mensah', credentials: 'BSc OT, OTR/L',
    specialty: 'Workplace & Ergonomics Support', specialtyTag: 'workplace',
    region: 'Western Region', years: 6, rating: 4.6, reviews: 41,
    availability: 'Accepting',
    bio: 'Helps clients return to work safely after injury and advises employers on ergonomic setups to prevent repetitive strain and fatigue.',
    phone: '+233 27 555 0163', email: 'samuel.mensah@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=51'
  },
  {
    id: 't05', name: 'Dr. Efua Asiedu', credentials: 'OTD, OTR/L',
    specialty: 'Geriatric & Independent Living', specialtyTag: 'geriatric',
    region: 'Central Region', years: 21, rating: 4.9, reviews: 178,
    availability: 'Accepting',
    bio: 'Specialises in fall prevention, home safety assessments, and helping older adults maintain independence in their own homes.',
    phone: '+233 20 555 0129', email: 'efua.asiedu@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=45'
  },
  {
    id: 't06', name: 'Yaw Darko', credentials: 'MSc OT, OTR/L',
    specialty: 'Autism & Sensory Integration', specialtyTag: 'pediatric',
    region: 'Greater Accra', years: 8, rating: 4.7, reviews: 87,
    availability: 'Waitlist',
    bio: 'Supports autistic children and their families with sensory regulation strategies, adaptive routines, and classroom accommodations.',
    phone: '+233 24 555 0175', email: 'yaw.darko@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=14'
  },
  {
    id: 't07', name: 'Dr. Abena Frimpong', credentials: 'OTD, OTR/L',
    specialty: 'Mental Health & Wellbeing', specialtyTag: 'mental-health',
    region: 'Ashanti Region', years: 11, rating: 4.8, reviews: 103,
    availability: 'Accepting',
    bio: 'Uses occupation-based approaches to support routine building, motivation, and daily functioning for clients managing mental health conditions.',
    phone: '+233 27 555 0154', email: 'abena.frimpong@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=38'
  },
  {
    id: 't08', name: 'Isaac Appiah', credentials: 'BSc OT, OTR/L',
    specialty: 'Amputee & Prosthetic Rehabilitation', specialtyTag: 'physical',
    region: 'Northern Region', years: 13, rating: 4.7, reviews: 64,
    availability: 'Accepting',
    bio: 'Guides clients through prosthetic training and adaptive techniques for daily tasks following limb loss, with a strong focus on independence.',
    phone: '+233 20 555 0116', email: 'isaac.appiah@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=53'
  },
  {
    id: 't09', name: 'Dr. Comfort Adjei', credentials: 'OTD, OTR/L',
    specialty: "Parkinson's & Movement Disorders", specialtyTag: 'neuro',
    region: 'Eastern Region', years: 16, rating: 4.9, reviews: 121,
    availability: 'Waitlist',
    bio: "Works with clients living with Parkinson's and related movement disorders to maintain function, safety, and quality of life at home.",
    phone: '+233 24 555 0188', email: 'comfort.adjei@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=41'
  },
  {
    id: 't10', name: 'Nana Kofi Boadi', credentials: 'MSc OT, OTR/L',
    specialty: 'Arthritis & Joint Protection', specialtyTag: 'physical',
    region: 'Greater Accra', years: 10, rating: 4.6, reviews: 58,
    availability: 'Accepting',
    bio: 'Teaches joint protection techniques and recommends adaptive equipment to reduce pain and preserve function for people with arthritis.',
    phone: '+233 27 555 0139', email: 'nanakofi.boadi@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=59'
  },
  {
    id: 't11', name: 'Dr. Akosua Nyarko', credentials: 'OTD, OTR/L',
    specialty: 'Developmental & Down Syndrome Support', specialtyTag: 'pediatric',
    region: 'Volta Region', years: 12, rating: 4.8, reviews: 77,
    availability: 'Accepting',
    bio: 'Supports children with developmental delays and Down syndrome through motor skill development and family coaching programmes.',
    phone: '+233 20 555 0147', email: 'akosua.nyarko@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=25'
  },
  {
    id: 't12', name: 'Emmanuel Tetteh', credentials: 'BSc OT, OTR/L',
    specialty: 'Traumatic Brain Injury Rehabilitation', specialtyTag: 'neuro',
    region: 'Greater Accra', years: 7, rating: 4.5, reviews: 39,
    availability: 'Closed',
    bio: 'Helps clients recovering from traumatic brain injury rebuild cognitive routines, safety awareness, and daily living skills step by step.',
    phone: '+233 24 555 0161', email: 'emmanuel.tetteh@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=60'
  },
  {
    id: 't13', name: 'Dr. Gifty Owusu-Ansah', credentials: 'OTD, OTR/L',
    specialty: 'Multiple Sclerosis & Chronic Illness', specialtyTag: 'neuro',
    region: 'Central Region', years: 15, rating: 4.9, reviews: 112,
    availability: 'Accepting',
    bio: 'Partners with clients managing MS and other chronic conditions to conserve energy, adapt routines, and stay engaged in valued activities.',
    phone: '+233 27 555 0173', email: 'gifty.owusuansah@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=29'
  },
  {
    id: 't14', name: 'Prince Osei', credentials: 'MSc OT, OTR/L',
    specialty: 'Assistive Technology & Home Modification', specialtyTag: 'physical',
    region: 'Ashanti Region', years: 9, rating: 4.7, reviews: 66,
    availability: 'Accepting',
    bio: 'Assesses homes for accessibility and recommends adaptive equipment and modifications that support safe, independent living.',
    phone: '+233 20 555 0192', email: 'prince.osei@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=68'
  },
  {
    id: 't15', name: 'Dr. Adwoa Sarpong', credentials: 'OTD, OTR/L',
    specialty: 'Chronic Pain & Fatigue Management', specialtyTag: 'physical',
    region: 'Greater Accra', years: 19, rating: 4.8, reviews: 154,
    availability: 'Waitlist',
    bio: 'Combines pacing strategies, graded activity, and adaptive techniques to help clients manage chronic pain while staying active.',
    phone: '+233 24 555 0121', email: 'adwoa.sarpong@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=44'
  },
  {
    id: 't16', name: 'Daniel Nkrumah', credentials: 'BSc OT, OTR/L',
    specialty: 'Community Reintegration & Independent Living', specialtyTag: 'geriatric',
    region: 'Northern Region', years: 5, rating: 4.4, reviews: 27,
    availability: 'Accepting',
    bio: 'Supports clients transitioning from hospital or rehab back into community life, focusing on daily routines and practical independence.',
    phone: '+233 27 555 0158', email: 'daniel.nkrumah@ablespace-ot.example',
    photo: 'https://i.pravatar.cc/240?img=57'
  }
];