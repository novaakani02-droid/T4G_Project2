/* ==========================================================================
   AbleSpace — Musa Knowledge Engine
   Shared, keyword-scored response engine used by BOTH:
     - the full Ask Musa page (assets/js/musa.js)
     - the floating Musa widget on every page (assets/js/musa-widget.js)
   Keeping this in one file means both surfaces always answer identically.
   ========================================================================== */

(function () {
  "use strict";

  // Each topic: id, label (shown as a suggestion chip), keywords to match
  // against the user's message, and a short, educational reply written in
  // Musa's voice. Replies stay educational — never diagnostic or prescriptive.
  const TOPICS = [
    {
      id: "adl",
      label: "Activities of Daily Living",
      keywords: ["adl", "daily living", "self-care", "self care", "dressing", "bathing", "showering", "toileting", "grooming", "feeding myself", "hygiene"],
      reply: "Activities of Daily Living (ADLs) are the core self-care tasks — bathing, dressing, toileting, grooming, and feeding. OT breaks each one into smaller steps and looks at where the difficulty actually is (reach, grip, balance, sequencing) before suggesting adaptive techniques or equipment. For example, one-handed dressing usually starts with the affected side first. Visit the Therapy Hub and filter by 'Activities of Daily Living' for step-by-step guides on the specific task you're working on."
    },
    {
      id: "iadl",
      label: "IADLs",
      keywords: ["iadl", "instrumental", "meal prep", "cooking", "shopping", "laundry", "medication management", "money management", "housework", "cleaning", "transportation", "driving"],
      reply: "Instrumental Activities of Daily Living (IADLs) are the more complex tasks needed to live independently — cooking, managing money, medication, shopping, laundry, and using transportation. These often demand more planning and safety awareness than basic self-care. In the Therapy Hub, IADL entries include safety tips specific to each task (like kitchen or medication safety) alongside adaptive strategies and equipment suggestions."
    },
    {
      id: "stroke",
      label: "Stroke Rehabilitation",
      keywords: ["stroke", "hemiplegia", "hemiparesis", "cva", "one side weak", "one-handed"],
      reply: "After a stroke, OT typically focuses on regaining function on the affected side while teaching safe, efficient one-handed techniques for the tasks that can't wait for full recovery. Common areas include one-handed dressing, adaptive utensils for feeding, and retraining transfers and balance. Fatigue and attention can also be affected, so pacing matters as much as the physical technique. A stroke rehab OT can tailor a plan to your specific side of weakness and stage of recovery."
    },
    {
      id: "pediatric",
      label: "Pediatric OT",
      keywords: ["pediatric", "paediatric", "child", "kid", "toddler", "school challenges", "handwriting"],
      reply: "Pediatric OT supports children in the 'occupations' of childhood — play, learning, school participation, and self-care. It often addresses fine motor skills (handwriting, buttons, scissors), sensory processing, gross motor coordination, and social participation. Therapy is usually play-based, since play is how children practice and generalize skills. If a school-age concern is affecting handwriting or classroom participation, a pediatric OT can assess the underlying skill gaps."
    },
    {
      id: "adult-rehab",
      label: "Adult Rehabilitation",
      keywords: ["adult rehabilitation", "adult rehab", "return to work", "injury recovery"],
      reply: "Adult rehabilitation OT focuses on restoring function after injury, illness, or surgery — often rebuilding strength, endurance, and task-specific skills needed to return to work, home management, and community life. Programs are typically graded, starting with simplified versions of a task and building toward the full activity as tolerance improves."
    },
    {
      id: "geriatric",
      label: "Geriatric OT",
      keywords: ["geriatric", "elderly", "older adult", "aging", "ageing", "senior"],
      reply: "Geriatric OT supports older adults in maintaining independence as strength, balance, memory, or vision change with age. Common focus areas are fall prevention, home safety modifications, energy conservation, and adapting daily routines to reduce strain on joints. Small environmental changes — grab bars, better lighting, decluttered pathways — often make a bigger difference than people expect."
    },
    {
      id: "neuro-rehab",
      label: "Neurological Rehabilitation",
      keywords: ["neurological", "neuro rehab", "parkinson", "multiple sclerosis", "ms", "traumatic brain injury", "tbi", "spinal cord injury", "sci"],
      reply: "Neurological rehabilitation covers conditions like Parkinson's disease, MS, traumatic brain injury, and spinal cord injury. OT here addresses motor control, coordination, cognition, and adapting tasks to a changing or fluctuating ability level. For progressive conditions like Parkinson's, therapy often focuses on maintaining function and building compensatory strategies early, rather than waiting for a task to become difficult."
    },
    {
      id: "orthopedic",
      label: "Orthopedic Rehabilitation",
      keywords: ["orthopedic", "orthopaedic", "fracture", "joint replacement", "post-surgery", "surgery recovery"],
      reply: "Orthopedic OT supports recovery after fractures, joint replacements, or surgery — rebuilding range of motion, strength, and the ability to perform daily tasks within any movement precautions your surgeon has set (like hip or shoulder precautions). Adaptive equipment is often used short-term while healing progresses."
    },
    {
      id: "splinting",
      label: "Splinting",
      keywords: ["splint", "splinting", "orthosis", "brace"],
      reply: "Splints (orthoses) are custom or prefabricated devices that support, protect, or gradually reposition a joint — commonly used after hand injuries, tendon repairs, or to manage conditions like arthritis. Wearing schedules matter a lot: too little wear time reduces benefit, too much can cause stiffness or skin issues. A hand therapist can fit and adjust a splint to your specific injury and stage of healing."
    },
    {
      id: "wheelchair",
      label: "Wheelchairs & Seating",
      keywords: ["wheelchair", "seating", "mobility device", "pressure cushion"],
      reply: "Wheelchair and seating assessments look at posture, pressure distribution, transfers, and how the chair fits the person's home and daily routine — not just mobility. Poor fit can contribute to pressure injuries or pain, so proper sizing and cushioning matter. An OT or seating specialist can assess fit and recommend cushions or positioning supports."
    },
    {
      id: "home-mods",
      label: "Home Modifications",
      keywords: ["home modification", "ramp", "grab bar", "widen doorway", "home safety changes", "bathroom modification"],
      reply: "Home modifications range from simple (grab bars, non-slip mats, better lighting) to structural (ramps, widened doorways, walk-in showers). OTs assess the home environment against the person's specific mobility and safety needs, prioritizing changes that reduce the highest fall or injury risk first, often starting with bathrooms and entryways."
    },
    {
      id: "autism",
      label: "Autism",
      keywords: ["autism", "autistic", "asd"],
      reply: "OT for autistic individuals often focuses on sensory regulation, fine and gross motor skills, daily routines, and participation in school or community activities — built around each person's individual sensory profile and strengths rather than a one-size-fits-all approach. Sensory strategies (calming or alerting activities, environmental adjustments) are commonly paired with skill-building for specific daily tasks."
    },
    {
      id: "adhd",
      label: "ADHD",
      keywords: ["adhd", "attention deficit", "hyperactiv"],
      reply: "OT support for ADHD often targets executive function skills — planning, organization, time management, and task initiation — alongside strategies for sensory regulation and sustaining attention during daily tasks like homework, chores, or morning routines. Visual schedules and broken-down task steps are common tools."
    },
    {
      id: "sensory",
      label: "Sensory Integration",
      keywords: ["sensory integration", "sensory processing", "spd", "sensory issues", "sensory overload"],
      reply: "Sensory integration therapy addresses how the brain processes input from touch, movement, sound, and other senses. Some people are over-responsive (overwhelmed by noise, textures, light) while others are under-responsive and seek out more input. An OT trained in sensory integration can identify a person's sensory profile and build a 'sensory diet' — a personalized set of activities that support regulation throughout the day."
    },
    {
      id: "fine-motor",
      label: "Fine Motor Skills",
      keywords: ["fine motor", "grip", "pincer grasp", "buttoning", "writing", "handwriting", "dexterity"],
      reply: "Fine motor skills involve the small muscles of the hands and fingers — needed for writing, buttoning, using utensils, and manipulating small objects. Therapy usually combines hand-strengthening activities (like therapy putty) with functional practice on the specific task that's difficult, since strength alone doesn't always transfer to coordination."
    },
    {
      id: "gross-motor",
      label: "Gross Motor Skills",
      keywords: ["gross motor", "coordination", "core strength", "balance skills"],
      reply: "Gross motor skills involve the larger muscle groups used for balance, posture, and whole-body movement — walking, climbing stairs, sitting upright, and transferring safely. OT often works on core stability and postural control as a foundation, since fine motor and self-care tasks are harder to perform without a stable base."
    },
    {
      id: "milestones",
      label: "Developmental Milestones",
      keywords: ["developmental milestone", "development delay", "developmental delay", "delayed development"],
      reply: "Developmental milestones are the typical skill ranges children reach in motor, sensory, communication, and self-care development. A developmental delay means a child isn't yet meeting milestones for their age in one or more areas. Early OT evaluation can identify specific gaps and start intervention while the brain is most adaptable — earlier support generally leads to better outcomes."
    },
    {
      id: "hand-therapy",
      label: "Hand Therapy",
      keywords: ["hand therapy", "hand injury", "tendon", "finger injury", "wrist injury"],
      reply: "Hand therapy is a specialized OT practice area for injuries to the hand, wrist, and forearm — tendon repairs, fractures, nerve injuries, and arthritis. It typically combines splinting, scar management, graded exercise, and functional retraining, closely coordinated with the surgeon's healing timeline and precautions."
    },
    {
      id: "burn",
      label: "Burn Rehabilitation",
      keywords: ["burn rehabilitation", "burn recovery", "burn scar", "skin graft"],
      reply: "Burn rehabilitation focuses on managing scar tissue, maintaining range of motion, and preventing contractures (tightening that limits movement) as burns heal. This often involves positioning, splinting, compression garments, and graded stretching, alongside adapting daily tasks during the healing period."
    },
    {
      id: "mental-health",
      label: "Mental Health",
      keywords: ["mental health", "depression", "anxiety", "wellbeing", "stress management"],
      reply: "Mental health OT supports the daily routines, roles, and activities that can be disrupted by conditions like depression or anxiety — sleep hygiene, structured routines, meaningful activity, and stress-management strategies. If you're going through a difficult time personally, it's worth speaking with a counsellor, doctor, or mental health professional in addition to anything explored here."
    },
    {
      id: "cognitive",
      label: "Cognitive Rehabilitation",
      keywords: ["cognitive rehabilitation", "memory", "executive function", "concentration", "brain fog"],
      reply: "Cognitive rehabilitation addresses memory, attention, planning, and problem-solving — skills needed for nearly every daily task. Strategies range from external supports (calendars, checklists, labeled storage) to structured retraining exercises, chosen based on which cognitive area is affected and how it shows up in daily life."
    },
    {
      id: "community",
      label: "Community Reintegration",
      keywords: ["community reintegration", "community participation", "going out", "social participation"],
      reply: "Community reintegration focuses on rebuilding the confidence and skills needed to participate in public life — using transportation, navigating public spaces, socializing, or returning to work or worship. OT often practices these skills in graded steps, starting with shorter or lower-demand outings and building up."
    },
    {
      id: "ergonomics",
      label: "Workplace Ergonomics",
      keywords: ["ergonomics", "workplace injury", "desk setup", "repetitive strain", "rsi"],
      reply: "Workplace ergonomics looks at how a workstation, tools, and task patterns affect strain on the body — desk and chair height, monitor position, keyboard placement, and break patterns for repetitive tasks. Small adjustments (wrist support, screen height, more frequent breaks) can meaningfully reduce strain-related pain over time."
    },
    {
      id: "pressure-injury",
      label: "Pressure Injury Prevention",
      keywords: ["pressure injury", "pressure sore", "bed sore", "bedsore", "pressure ulcer"],
      reply: "Pressure injuries develop when sustained pressure — usually from prolonged sitting or lying in one position — cuts off blood flow to the skin. Prevention centers on regular repositioning schedules, proper cushioning or mattress surfaces, good skin checks, and nutrition. This is especially important for people with reduced mobility or sensation."
    },
    {
      id: "falls",
      label: "Falls Prevention",
      keywords: ["fall prevention", "falling", "trip hazard", "balance safety"],
      reply: "Falls prevention combines home safety changes (clear pathways, grab bars, good lighting, non-slip flooring), balance and strength exercises, and reviewing footwear and mobility aids. If falls are frequent or a new pattern, it's worth mentioning to a doctor as well, since medication or vision changes can also contribute."
    },
    {
      id: "caregiver",
      label: "Caregiver Education",
      keywords: ["caregiver", "care giver", "family support", "carer strategies"],
      reply: "Caregiver education covers safe techniques for assisting with transfers and daily tasks, recognizing caregiver fatigue, and structuring routines that support both the person receiving care and the caregiver's own wellbeing. Proper body mechanics during assisted transfers protects the caregiver's back as much as it protects the person being helped."
    },
    {
      id: "adaptive-equipment",
      label: "Adaptive Equipment",
      keywords: ["adaptive equipment", "assistive device", "reacher", "grab bar", "sock aid", "button hook"],
      reply: "Adaptive equipment modifies how a task is done rather than changing the task itself — think reachers, sock aids, button hooks, jar openers, or built-up utensil handles. The right piece of equipment depends on exactly where the difficulty is (grip, reach, balance), so it's worth identifying the specific barrier before buying equipment. The Therapy Hub lists equipment recommendations alongside each activity."
    },
    {
      id: "positioning",
      label: "Positioning",
      keywords: ["positioning", "seating position", "postural support"],
      reply: "Good positioning — whether seated, lying, or standing — supports safer breathing, digestion, skin integrity, and function. It matters most for people who spend long periods in one position due to reduced mobility. Positioning is often reassessed alongside equipment like wheelchairs or hospital beds."
    },
    {
      id: "transfers",
      label: "Transfers",
      keywords: ["transfer", "bed to chair", "sliding board", "pivot transfer"],
      reply: "Transfers are the movements between surfaces — bed to wheelchair, chair to toilet, and so on. Safe technique depends on the person's weight-bearing ability and strength: options range from a stand-pivot transfer to using a sliding board or full mechanical lift. Getting the technique right protects both the person and any caregiver assisting."
    },
    {
      id: "school",
      label: "School Support",
      keywords: ["school support", "classroom", "individualized education", "iep"],
      reply: "School-based OT supports a child's participation in the classroom — handwriting, using classroom tools, sensory regulation during the school day, and social participation. This often involves collaborating with teachers on classroom accommodations alongside direct skill-building with the student."
    },
    {
      id: "assistive-tech",
      label: "Assistive Technology",
      keywords: ["assistive technology", "voice assistant", "switch access", "communication device"],
      reply: "Assistive technology ranges from simple tools to more advanced devices — voice-activated assistants, switch-access controls, screen readers, or communication devices — matched to a person's specific physical, sensory, or communication needs. An OT can help identify which category of technology would genuinely reduce a daily barrier, rather than adding complexity."
    },
    {
      id: "energy",
      label: "Energy Conservation",
      keywords: ["energy conservation", "fatigue", "pacing", "tired", "exhaustion"],
      reply: "Energy conservation techniques help spread effort across the day to avoid crashing: planning tasks in advance, sitting for tasks that can be done seated, breaking large tasks into stages with rest breaks, and prioritizing what matters most on lower-energy days. This is especially useful for chronic pain, fatigue-related conditions, cardiac or respiratory conditions, and neurological conditions like MS or Parkinson's."
    },
    {
      id: "joint-protection",
      label: "Joint Protection",
      keywords: ["joint protection", "arthritis", "joint pain", "protect my joints"],
      reply: "Joint protection techniques reduce strain on painful or vulnerable joints — using larger joints instead of smaller ones for a task, avoiding tight gripping for long periods, using built-up handles, and alternating positions regularly. These strategies are especially relevant for arthritis, where repeated strain can accelerate joint damage over time."
    },
    {
      id: "hep",
      label: "Home Exercise Programs",
      keywords: ["home exercise program", "hep", "exercises at home", "home program"],
      reply: "A home exercise program (HEP) is a set of exercises prescribed by a therapist to continue progress between sessions — usually targeting strength, range of motion, or coordination specific to your goals. Consistency matters more than intensity; a shorter routine done daily generally outperforms a long routine done rarely."
    },
    {
      id: "ghana-resources",
      label: "Ghana Healthcare Resources",
      keywords: ["ghana", "ghanaian", "accra", "kumasi", "nhis", "ghana health service"],
      reply: "In Ghana, occupational therapy services are available through Ghana Health Service facilities, several teaching hospitals (including Korle Bu and Komfo Anokye), and private rehabilitation clinics — many accept NHIS for eligible services, though coverage varies, so it's worth confirming with the facility directly. For urgent medical emergencies, Ghana's National Ambulance Service can be reached on 112. You can also browse the Find a Therapist directory on AbleSpace for OTs practicing across Ghana's regions."
    }
  ];

  const GREETING_RE = /^(hi|hello|hey|good morning|good afternoon|good evening|morning|evening)\b/i;
  const THANKS_RE = /\b(thank you|thanks|thank u|appreciate it)\b/i;
  const CRISIS_RE = /\b(suicide|kill myself|end my life|hurt myself|self harm|self-harm)\b/i;

  function scoreTopic(topic, textLower) {
    let score = 0;
    topic.keywords.forEach(function (kw) {
      if (textLower.indexOf(kw) !== -1) score += kw.split(" ").length; // reward longer/more specific matches
    });
    return score;
  }

  function getResponse(rawText) {
    const text = (rawText || "").trim();
    const lower = text.toLowerCase();

    if (!text) {
      return { reply: "I'm listening — what would you like to know about occupational therapy, daily activities, or adaptive strategies?", topicId: null };
    }
    if (CRISIS_RE.test(lower)) {
      return {
        reply: "I'm really glad you reached out, and I want to make sure you get the right kind of support right now — that's outside what I'm able to help with as an educational OT assistant. Please contact Ghana's National Ambulance Service on 112, or reach out to a crisis line, doctor, or someone you trust immediately. You don't have to go through this alone.",
        topicId: null
      };
    }
    if (THANKS_RE.test(lower)) {
      return { reply: "You're very welcome! Is there anything else about your daily routine or adaptive strategies I can help with?", topicId: null };
    }
    if (GREETING_RE.test(lower) && text.split(" ").length < 5) {
      return { reply: "Hello! I'm Musa, your AbleSpace OT companion. Ask me about daily activities, adaptive techniques, home safety, assistive devices, or any of the topics in the suggestions below.", topicId: null };
    }

    let best = null;
    let bestScore = 0;
    TOPICS.forEach(function (topic) {
      const s = scoreTopic(topic, lower);
      if (s > bestScore) { bestScore = s; best = topic; }
    });

    if (best) {
      return { reply: best.reply, topicId: best.id };
    }

    return {
      reply: "I don't have a specific answer for that yet, but I can help with topics like ADLs, IADLs, stroke or neurological rehab, pediatric OT, sensory processing, adaptive equipment, home modifications, energy conservation, and more. Try rephrasing, or tap one of the suggested topics — and remember, for anything specific to your situation, a licensed OT can give you a personalised assessment.",
      topicId: null
    };
  }

  window.MusaEngine = {
    topics: TOPICS,
    getResponse: getResponse
  };
})();
