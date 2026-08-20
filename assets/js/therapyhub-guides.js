/* Detailed practical guide content for the Therapy Hub
   Each guide contains: id, name, image, alt, category, blurb, overview,
   equipment, steps, safety, equipmentThatMayHelp, whenToSeek
   This file is loaded only by therapy-hub.html and used by therapyhub.js
*/
(function(){
  window.TH_GUIDES = [
    {
      id: 'adl-dress-upper',
      name: 'Dressing with One Hand',
      image: 'assets/img/one_handed_dressing_guide_1786108824845.jpg',
      alt: 'Person using one-handed dressing technique while seated',
      category: 'Self-Care',
      blurb: 'Practical approaches to putting on clothing when hand or arm use is limited.',
      overview: 'Dressing is an important daily activity. Reduced strength, coordination or one-sided weakness can make managing fastenings and garment positioning difficult. These strategies aim to improve independence and safety while preserving dignity.',
      equipment: ['Loose-fitting clothing', 'Front-opening shirts', 'Elastic-waist trousers', 'Dressing stick', 'Button hook', 'Long-handled shoehorn', 'Reacher'],
      steps: [
        'Choose clothing that is easy to handle and place everything you need within reach.',
        'Sit in a stable position if standing is difficult or unsafe.',
        'Begin with the arm or side that is more difficult where appropriate; guide garments on using the stronger hand.',
        'Use dressing aids (button hook, dressing stick) for fasteners and reaching.',
        'Put on larger, looser clothing first and adjust smaller items gradually.',
        'Use a long-handled shoehorn and seated technique for footwear.'
      ],
      safety: ['Complete the task while seated if balance is reduced.', 'Keep frequently used clothing within easy reach.', 'Avoid rushing; take planned pauses.', 'Stop if pain or significant discomfort occurs.'],
      equipmentThatMayHelp: ['Dressing stick', 'Button hook', 'Long-handled shoehorn', 'Reacher'],
      whenToSeek: 'If dressing remains consistently unsafe, causes persistent pain, or requires assistance beyond what these strategies provide, consider an Occupational Therapist assessment for personalised strategies and equipment.'
    },
    {
      id: 'adl-bathing',
      name: 'Making Bathing Easier',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Accessible bathing setup with a shower chair and handheld shower head',
      category: 'Self-Care',
      blurb: 'Practical steps to make bathing safer and more manageable at home.',
      overview: 'Bathing can be a complex task requiring balance, coordination and safe transfers. Adapting the environment and sequence of tasks can increase safety and independence.',
      equipment: ['Shower chair or bench', 'Handheld shower head', 'Non-slip mats', 'Long-handled sponge'],
      steps: [
        'Prepare towels and clothing within easy reach before getting wet.',
        'Use a shower chair or bench to avoid prolonged standing where appropriate.',
        'Use a handheld shower to control water direction and limit unnecessary reaching.',
        'Clean in zones (upper body, lower body, back) to simplify the sequence and rest between zones.',
        'Use long-handled aids for hard-to-reach areas.'
      ],
      safety: ['Keep floors dry and use non-slip mats.', 'Install grab bars into studs where recommended.', 'Consider a shower chair if standing tolerance is limited.', 'Check water temperature before contact.'],
      equipmentThatMayHelp: ['Shower chair', 'Grab bars', 'Handheld shower head', 'Long-handled sponge'],
      whenToSeek: 'If transfers are unsafe, balance is poor, or there is pain during bathing, consult an Occupational Therapist for a safety and mobility assessment.'
    },
    {
      id: 'adl-teeth',
      name: 'Brushing Teeth with Limited Hand Function',
      image: 'assets/img/one_handed_dressing_guide_1786108824845.jpg',
      alt: 'Person brushing teeth using an adapted toothbrush with a built-up handle',
      category: 'Self-Care',
      blurb: 'Techniques and tools to support independent oral care when grip or reach is reduced.',
      overview: 'Limited hand function can make brushing and rinsing challenging. Simple adaptations and task sequencing often improve independence and hygiene.',
      equipment: ['Electric or angled toothbrush', 'Built-up handle or foam grip', 'Suction-base cup for rinsing'],
      steps: [
        'Position yourself comfortably at the sink with items within reach.',
        'Use an electric brush or an angled head to reduce required manual movement.',
        'Stabilise the cup or use a suction-base cup for rinsing if needed.',
        'Break the routine into short stages (brush, rinse, floss) and rest between them as necessary.'
      ],
      safety: ['Sit while brushing if balance is reduced.', 'Avoid forcing the hand into painful positions.', 'If choking or swallowing concerns exist, seek professional advice.'],
      equipmentThatMayHelp: ['Electric toothbrush', 'Built-up handle', 'Suction-base cup'],
      whenToSeek: 'If oral care is consistently incomplete, causes pain, or if swallowing is a concern, consult a dentist and an Occupational Therapist.'
    },
    {
      id: 'adl-toileting',
      name: 'Making Toileting More Independent',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Accessible bathroom showing grab bars and raised toilet seat',
      category: 'Self-Care',
      blurb: 'Strategies to improve safety, sequence and independence with toileting tasks.',
      overview: 'Toileting includes transfers, clothing management and hygiene. Targeted strategies and simple equipment can improve safety and privacy.',
      equipment: ['Raised toilet seat', 'Grab bars', 'Toilet frame', 'Reachable toilet paper dispenser'],
      steps: [
        'Plan the sequence before starting: transfer, clothing management, hygiene.',
        'Ensure the transfer surface (toilet, chair) is stable and at an appropriate height.',
        'Use grab bars positioned into studs to assist standing and sitting.',
        'Keep hygiene items within easy reach and use aids (e.g., toilet aid) if needed.'
      ],
      safety: ['Install grab bars into studs where possible.', 'Avoid using unstable objects as supports.', 'Consider supervised practice of transfers before independent attempts.'],
      equipmentThatMayHelp: ['Raised toilet seat', 'Grab bars', 'Toilet frame'],
      whenToSeek: 'If transfers are unsafe, there is frequent incontinence, or skin integrity is a concern, talk with an Occupational Therapist or healthcare professional.'
    },
    {
      id: 'adl-feeding',
      name: 'Adaptive Feeding Strategies',
      image: 'assets/img/therapy_putty_exercise_guide_1786108838571.jpg',
      alt: 'Adaptive utensils and a plate with a plate guard',
      category: 'Self-Care',
      blurb: 'Practical tips and equipment to support safer, more independent mealtimes.',
      overview: 'Feeding includes posture, utensil control and swallowing safety. Small changes to equipment and positioning can improve success and dignity at mealtimes.',
      equipment: ['Built-up handle utensils', 'Plate guard', 'Non-slip mat', 'Two-handled cup'],
      steps: [
        'Sit with good trunk support at the table; use cushions or a supportive chair if needed.',
        'Use adapted utensils (built-up handles, rocker knife) to reduce grip demands.',
        'Place a plate guard to help scoop food without spillage.',
        'Pace bites, take small pieces, and pause between assisted steps to reduce choking risk.'
      ],
      safety: ['Assess swallowing safety if coughing or choking occurs during meals.', 'Sit upright during and for 30 minutes after eating if swallowing is a concern.', 'Take small bites and avoid risky textures until assessed.'],
      equipmentThatMayHelp: ['Built-up utensils', 'Plate guard', 'Rocker knife', 'Non-slip mat'],
      whenToSeek: 'If coughing, choking, or weight loss happens during meals, seek assessment from a speech and language therapist and an Occupational Therapist.'
    },
    {
      id: 'adl-transfers',
      name: 'Safer Everyday Transfers',
      image: 'assets/img/safe_sit_to_stand_guide_1786108852250.jpg',
      alt: 'Person performing a sit-to-stand transfer with assistance',
      category: 'Moving Around',
      blurb: 'Stepwise guidance to move safely between surfaces such as bed, chair and toilet.',
      overview: 'Transfers are common but high-risk activities. A clear sequence and appropriate equipment reduce injury risk to the person and caregiver.',
      equipment: ['Gait belt', 'Sliding transfer board', 'Stable chair with arms'],
      steps: [
        'Position yourself close to the edge of the seat with feet under hips.',
        'Use arms of the chair or a gait belt for leverage; lean forward before standing.',
        'Push through the stronger legs and stand tall; step to the destination slowly.',
        'Reverse the sequence for sitting: slow lowering, use arms for contact, and sit back gently.'
      ],
      safety: ['Lock brakes on wheelchairs or beds before transfers.', 'Keep the transfer path short and free of obstacles.', 'Use a gait belt if balance or strength is uncertain.'],
      equipmentThatMayHelp: ['Gait belt', 'Sliding board', 'Transfer bench'],
      whenToSeek: 'If transfers cause pain, repeated falls, or caregiver strain, consult an Occupational Therapist or physiotherapist for personalised training.'
    },
    {
      id: 'adl-mobility',
      name: 'Making Walking Safer',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Person walking indoors with clear pathways and supportive footwear',
      category: 'Moving Around',
      blurb: 'Practical advice to reduce falls and improve confidence when walking at home.',
      overview: 'Walking safely depends on balance, footwear, environment and fatigue. Simple environmental fixes and pacing strategies lower risk.',
      equipment: ['Supportive non-slip footwear', 'Appropriate mobility aid (cane/walker) if prescribed'],
      steps: [
        'Clear walkways of clutter and secure loose rugs.',
        'Improve lighting especially on stairs and transitions.',
        'Wear supportive, non-slip footwear at all times indoors when walking.',
        'Consider a mobility aid prescribed by a professional for longer distances.'
      ],
      safety: ['Remove trip hazards and use good lighting.', 'Avoid carrying large or heavy items while walking.', 'Take rest breaks during longer walks to avoid fatigue-related falls.'],
      equipmentThatMayHelp: ['Cane, walker or rollator', 'Non-slip footwear'],
      whenToSeek: 'If there are recurrent near-misses, falls, or progressive balance loss, see an Occupational Therapist or falls specialist for assessment.'
    },
    {
      id: 'skill-balance',
      name: 'Simple Balance & Movement Activities',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Person performing balance exercises near a countertop',
      category: 'Moving Around',
      blurb: 'Short, safe exercises to support standing balance and confidence.',
      overview: 'Balance practice in small doses can improve steadiness and reduce fall risk. Exercises should be practised near a support and progressed gradually.',
      equipment: ['Stable chair or countertop for support', 'Non-slip footwear'],
      steps: [
        'Stand with feet hip-width apart near a sturdy surface for support.',
        'Practice weight shifts side to side and forward/backwards for 1\u00032 minutes.',
        'Try small heel-to-toe steps along a short line while holding support.',
        'Increase challenge only when comfortable, e.g., reduce hand support or close eyes briefly.'
      ],
      safety: ['Practice near a stable surface and stop if dizzy.', 'Avoid trying advanced tasks without supervision if balance is poor.'],
      equipmentThatMayHelp: ['Stable rail or countertop'],
      whenToSeek: 'If balance worsens, or you experience falls or dizziness, see an Occupational Therapist or healthcare professional.'
    },
    {
      id: 'skill-finemotor',
      name: 'Everyday Hand & Finger Activities',
      image: 'assets/img/therapy_putty_exercise_guide_1786108838571.jpg',
      alt: 'Hands using therapy putty for grip and pinch exercises',
      category: 'Hands & Arms',
      blurb: 'Short, purposeful activities to improve hand strength and coordination.',
      overview: 'Fine motor tasks focus on precision, strength and coordination needed for daily tasks such as buttoning, writing and using utensils.',
      equipment: ['Therapy putty', 'Small objects for manipulation', 'Built-up grips for utensils'],
      steps: [
        'Start with gentle warm-up stretches for fingers and wrist.',
        'Use therapy putty for pinches, squeezes and finger extensions for 5\u000310 minutes.',
        'Practice functional tasks (buttoning, coins, writing) in short, focused bouts.',
        'Increase challenge gradually by reducing assistance or using smaller objects.'
      ],
      safety: ['Avoid overworking painful joints; stop if sharp pain occurs.', 'Take regular rest breaks to avoid fatigue.'],
      equipmentThatMayHelp: ['Therapy putty', 'Pencil grip', 'Small pegboards'],
      whenToSeek: 'If hand pain or swelling persists, consult an Occupational Therapist or hand therapist for tailored exercises and splinting options.'
    },
    {
      id: 'skill-handwriting',
      name: 'Making Writing Easier',
      image: 'assets/img/therapy_putty_exercise_guide_1786108838571.jpg',
      alt: 'Person writing with an adapted pencil grip at a well-lit desk',
      category: 'Hands & Arms',
      blurb: 'Posture, grip and simple adaptations to support clearer and less tiring handwriting.',
      overview: 'Good posture and an efficient grasp reduce pain and improve legibility. Small changes to tools and setup often help quickly.',
      equipment: ['Pencil grip', 'Slant board', 'Raised-line paper'],
      steps: [
        'Sit with feet supported and a stable surface at elbow height.',
        'Use a pencil grip or thicker pencil to reduce fine pinch demands.',
        'Use short, regular practice sessions focusing on letter formation rather than speed.',
        'Consider a slant board for improved wrist posture and visibility.'
      ],
      safety: ['Stop if writing causes increasing pain; reduce session length.', 'Ensure adequate lighting to reduce strain.'],
      equipmentThatMayHelp: ['Pencil grip', 'Slant board', 'Raised-line paper'],
      whenToSeek: 'If handwriting remains highly effortful, causes pain, or limits participation at school/work, consider an Occupational Therapist assessment.'
    },
    {
      id: 'skill-memory',
      name: 'Planning Your Day When Memory Is Difficult',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'A clearly labelled daily planner and reminder notes on a wall',
      category: 'Thinking & Memory',
      blurb: 'Simple external supports and planning strategies to reduce memory demands.',
      overview: 'External aids such as visual schedules, checklists and timers help people complete routines reliably even when memory is reduced.',
      equipment: ['Visual schedule or whiteboard', 'Timers', 'Reminder app'],
      steps: [
        'Plan a short list of priority tasks for the day and place it somewhere visible.',
        'Use a timer or phone alarm to signal the start and end of tasks.',
        'Break complex tasks into short steps with simple checkboxes to mark completion.',
        'Keep routine items consistently located to reduce search time.'
      ],
      safety: ['Use redundancy for important tasks (alarms and written notes).', 'Avoid overwhelming the person with too many reminders at once.'],
      equipmentThatMayHelp: ['Visual schedule', 'Timers', 'Reminder apps'],
      whenToSeek: 'If memory problems interfere with safety (medication, cooking, leaving the home) consult an Occupational Therapist or your healthcare provider.'
    },
    {
      id: 'skill-execfunction',
      name: 'Breaking Tasks Into Smaller Steps',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Step-by-step checklist on paper for a household task',
      category: 'Thinking & Memory',
      blurb: 'Task analysis and stepwise planning to simplify multi-step activities.',
      overview: 'Breaking tasks into clear, achievable steps reduces overwhelm and supports completion for people with planning difficulties.',
      equipment: ['Checklist or task app', 'Visual sequence cards', 'Timer'],
      steps: [
        'Identify the first small action that starts the task and write it down.',
        'Limit each step to a single, achievable action (e.g., "put kettle on" rather than "make tea").',
        'Check off steps as they are completed to provide feedback and momentum.',
        'Combine short steps into a routine once they become familiar.'
      ],
      safety: ['Avoid overly detailed lists that increase cognitive load.', 'Use positive reinforcement rather than pressure if tasks are challenging.'],
      equipmentThatMayHelp: ['Visual checklist', 'Reminder app', 'Simplified prompts'],
      whenToSeek: 'If executive difficulties significantly limit daily life, an Occupational Therapist can help design personalised routines and supports.'
    },
    {
      id: 'energy-rest',
      name: 'Managing Energy During the Day',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Person resting with a cup of tea and a short planner visible',
      category: 'Energy & Fatigue',
      blurb: 'Pacing, prioritising and rest strategies to manage daily energy.',
      overview: 'Energy management balances activity and rest using planning, task simplification and scheduled breaks to reduce fatigue-related limitations.',
      equipment: ['Pacing planner', 'Timer', 'Seated equipment for tasks'],
      steps: [
        'Identify essential tasks and schedule them at your higher-energy times.',
        'Break demanding tasks into shorter stages with planned rest in between.',
        'Alternate demanding tasks with low-effort activities to recover energy.',
        'Use seated options where possible to reduce exertion.'
      ],
      safety: ['Avoid pushing through severe fatigue as it may increase risk of falls or mistakes.', 'Monitor symptoms and stop if you experience unusual pain or breathlessness.'],
      equipmentThatMayHelp: ['Seated work surface', 'Timer', 'Pacing planner'],
      whenToSeek: 'If fatigue is persistent and limits participation despite pacing, seek further assessment from an Occupational Therapist or physician.'
    },
    {
      id: 'adl-bathroom-safety',
      name: 'Making Your Bathroom Safer',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Bathroom showing grab bars and non-slip mats',
      category: 'Home Safety',
      blurb: 'Environmental changes to reduce slips, trips and falls in the bathroom.',
      overview: 'Bathrooms are high-risk areas for falls; simple modifications and appropriate equipment improve safety and independence.',
      equipment: ['Grab bars', 'Non-slip mat', 'Shower chair', 'Raised toilet seat'],
      steps: [
        'Identify key transfer points (entry, toilet) and plan grab bar placement into studs.',
        'Use non-slip mats inside and outside the shower.',
        'Consider a shower chair when standing tolerance is limited.',
        'Ensure toiletries are within easy reach to avoid stretching or reaching.'
      ],
      safety: ['Install grab bars securely into studs or with professional fixings.', 'Check mat adhesion regularly and replace if worn.'],
      equipmentThatMayHelp: ['Grab bars', 'Shower chair', 'Raised toilet seat'],
      whenToSeek: 'If mobility or transfers are unsafe in the bathroom, an Occupational Therapist home visit can recommend personalised solutions.'
    },
    {
      id: 'iadl-mealprep',
      name: 'Creating a More Comfortable Kitchen',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Accessible kitchen workspace with items within easy reach',
      category: 'Home Safety',
      blurb: 'Kitchen setup and strategies to reduce risk and conserve energy during meal preparation.',
      overview: 'Adapting the kitchen layout, tools and sequence of tasks can support safer and more efficient meal preparation.',
      equipment: ['Jar opener', 'Rocker knife', 'Non-slip mat', 'Stool for seated prep'],
      steps: [
        'Organise frequently used items at waist-to-shoulder height to avoid bending or reaching.',
        'Use time-saving tools (jar opener, rocker knife) to reduce grip strain.',
        'Sit for tasks such as chopping where possible, using a stable stool.',
        'Plan meals in stages and use timers to avoid prolonged standing.'
      ],
      safety: ['Turn pan handles inward and use back burners when possible.', 'Use anti-scald measures and test water/heat carefully.'],
      equipmentThatMayHelp: ['Jar opener', 'Rocker knife', 'Stool for seated prep'],
      whenToSeek: 'If kitchen tasks are unsafe or painful, an Occupational Therapist can suggest ergonomic changes and specific adaptive tools.'
    },
    {
      id: 'equipment-aids',
      name: 'Choosing Adaptive Equipment',
      image: 'assets/img/reacher_grabber_tool_1786108868056.jpg',
      alt: 'Various adaptive equipment including a reacher/grabber tool',
      category: 'Assistive Equipment',
      blurb: 'How to choose and trial adaptive equipment that supports daily tasks.',
      overview: 'Equipment can bridge the gap between ability and task demands. Choosing the right item depends on the task, the person\u0002s strengths and environment.',
      equipment: ['Reacher/grabber', 'Dressing stick', 'Button hook', 'Long-handled shoehorn'],
      steps: [
        'Identify the specific task difficulty (reach, grip, transfer) first.',
        'Trial low-cost options to see if they meet needs before purchasing.',
        'Check return policies and choose items that feel comfortable and safe to use.',
        'Consider an Occupational Therapist prescription for specialised equipment.'
      ],
      safety: ['Ensure equipment is used as intended and in good condition.', 'Avoid unstable substitutes for proper equipment.'],
      equipmentThatMayHelp: ['Reacher', 'Button hook', 'Dressing stick'],
      whenToSeek: 'If unsure which equipment suits needs, an Occupational Therapist can recommend and trial appropriate devices.'
    },
    {
      id: 'school-work',
      name: 'Creating a More Comfortable Study Space',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Person working at an ergonomic desk with good lighting',
      category: 'School & Work',
      blurb: 'Simple ergonomic and organisational changes to improve comfort and concentration.',
      overview: 'A well-organised study or work space supports posture, reduces pain and helps concentration. Small changes often provide immediate benefit.',
      equipment: ['Ergonomic chair', 'Adjustable desk height or cushion', 'Good lighting', 'Pencil grip for writing tasks'],
      steps: [
        'Set desk height so elbows rest comfortably at table level.',
        'Use a supportive chair and change position regularly.',
        'Ensure good, even lighting to reduce eye strain.',
        'Organise materials so frequently used items are within easy reach.'
      ],
      safety: ['Take regular movement breaks to avoid prolonged static posture.', 'Adjust seating to avoid neck or shoulder strain.'],
      equipmentThatMayHelp: ['Ergonomic chair', 'Adjustable desk', 'Good lighting'],
      whenToSeek: 'If pain or concentration problems persist despite adjustments, consider an Occupational Therapist or ergonomist assessment.'
    },
    {
      id: 'iadl-community',
      name: 'Returning to Meaningful Hobbies',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'Person engaging in a hobby with adapted tools',
      category: 'Leisure & Social',
      blurb: 'Steps to safely re-engage with hobbies and meaningful activities.',
      overview: 'Reintroducing hobbies supports wellbeing and identity. Gradual, task-focused practice and adaptations help restore participation.',
      equipment: ['Adaptive tools for the hobby', 'Seating or supports to reduce fatigue'],
      steps: [
        'Identify meaningful activities and break them into manageable steps.',
        'Start with short practice sessions and increase gradually.',
        'Use adaptive tools or modified techniques to reduce physical demands.',
        'Consider group sessions or community classes for social support.'
      ],
      safety: ['Pace activity to avoid overuse and fatigue.', 'Use appropriate protective equipment if required by the hobby.'],
      equipmentThatMayHelp: ['Adaptive tools', 'Seating supports'],
      whenToSeek: 'If returning to a hobby causes pain or unsafe movement patterns, an Occupational Therapist can recommend graded approaches and equipment.'
    },
    {
      id: 'social-participation',
      name: 'Staying Connected With Others',
      image: 'assets/img/supporting_independence_1786108220148.jpg',
      alt: 'People meeting and connecting in a community space',
      category: 'Leisure & Social',
      blurb: 'Practical tips to maintain social connection and participation.',
      overview: 'Social contact supports mental health. Small planning steps and use of supports reduce barriers to staying connected.',
      equipment: ['Phone with speed-dial or voice assistant', 'Transport aids as needed'],
      steps: [
        'Schedule short, regular social check-ins with friends or family.',
        'Use reminder tools or shared calendars to plan meetups.',
        'Start with low-demand social activities and increase as confidence grows.'
      ],
      safety: ['Plan accessibility needs for venues and travel.', 'Inform a contact about support needs if required.'],
      equipmentThatMayHelp: ['Phone with reminders', 'Accessible transport options'],
      whenToSeek: 'If social withdrawal is prolonged or related to mobility/cognitive barriers, an Occupational Therapist can help plan supported participation.'
    }
  ];
})();
