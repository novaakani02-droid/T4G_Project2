/* ==========================================================================
   AbleSpace — Therapy Hub Problem Library
   Replaces the old flat "activities" list with a problem-first model:
   the caregiver/client picks WHAT the person is struggling with (an ADL,
   an IADL, or a condition/skill), and the right panel renders a structured
   Solution (interventions, exercises, equipment, home mods, activities,
   outcomes, difficulty, age group, time) plus pooled Safety Tips.
   ========================================================================== */

/* ---------- Reusable safety-tip pools ----------
   Item entries reference 1-3 pools by key; the renderer (therapyhub.js)
   pulls the top tips from each referenced pool and merges in any
   item-specific extras. This keeps ~57 problem entries maintainable
   without repeating the same safety language dozens of times. */
const TH_SAFETY_POOLS = {
  fall: [
    'Clear walkways of clutter, loose rugs, and trailing cords.',
    'Ensure good lighting, especially on stairs and at night.',
    'Wear supportive, non-slip footwear during the activity.'
  ],
  transfer: [
    'Lock wheelchair brakes or bed wheels before any transfer.',
    'Keep the transfer path short, direct, and obstacle-free.',
    'Use a gait belt if balance or strength is uncertain.'
  ],
  kitchen: [
    'Store sharp tools safely; keep blades sharp, not dull.',
    'Work seated at counter height to reduce strain.',
    'Turn pot and pan handles inward to prevent spills.'
  ],
  bathroom: [
    'Install grab bars near the toilet and shower, into wall studs.',
    'Check water temperature with your forearm before contact.',
    'Use a shower chair if standing tolerance is limited.'
  ],
  wheelchair: [
    'Check tyre pressure and brake function regularly.',
    'Perform pressure-relief lifts every 15\u201330 minutes to protect skin.',
    'Confirm doorways and turning space meet wheelchair width.'
  ],
  energy: [
    'Break the task into stages with planned rest breaks.',
    'Sit rather than stand wherever the task allows.',
    'Schedule demanding tasks for your higher-energy times of day.'
  ],
  joint: [
    'Use larger, stronger joints over small ones where possible.',
    'Avoid tight, sustained gripping for long periods.',
    'Alternate hand or body positions regularly to reduce strain.'
  ],
  caregiver: [
    'Offer help only where it is asked for.',
    'Use proper body mechanics \u2014 bend knees, not back \u2014 when assisting.',
    'Build in rest periods for yourself, not just the person you support.'
  ],
  home: [
    'Keep frequently used items within easy, waist-to-shoulder reach.',
    'Add labels or visual cues to support orientation.',
    'Revisit the setup periodically as needs change.'
  ],
  sensory: [
    'Introduce new sensory input gradually, not all at once.',
    'Offer a quiet space to retreat to if overwhelmed.',
    'Watch for early signs of sensory overload before escalation.'
  ],
  cognitive: [
    'Give one simple instruction at a time.',
    'Keep a consistent daily routine to reduce confusion.',
    'Use visual schedules or written checklists as memory support.'
  ],
  community: [
    'Start with shorter, lower-demand outings and build up gradually.',
    'Carry a card with emergency contact information.',
    'Plan routes and timing in advance to reduce uncertainty.'
  ],
  medication: [
    'Use a pill organiser labelled by day and time.',
    'Store medications away from children and out of direct sunlight.',
    'Keep an up-to-date medication list for emergencies.'
  ],
  driving: [
    'Have vision and reaction time assessed before returning to driving.',
    'Practise in low-traffic conditions before busier routes.',
    'Know your local rules on medical fitness-to-drive reporting.'
  ],
  child: [
    'Never leave a child unattended near water, stairs, or hot surfaces.',
    'Keep small choking-hazard items out of reach.',
    'Match supervision level to the child\u2019s current developmental stage.'
  ],
  workplace: [
    'Set up the workstation to neutral joint positions before starting.',
    'Take a short movement break every 30\u201345 minutes.',
    'Report pain early rather than working through it.'
  ]
};

function pickSafety(pools, extra) {
  const seen = new Set();
  const out = [];
  (pools || []).forEach(function (key) {
    (TH_SAFETY_POOLS[key] || []).slice(0, 2).forEach(function (t) {
      if (!seen.has(t)) { seen.add(t); out.push(t); }
    });
  });
  (extra || []).forEach(function (t) {
    if (!seen.has(t)) { seen.add(t); out.push(t); }
  });
  return out.slice(0, 5);
}

function I(id, name, cat, group, icon, o) {
  return {
    id: id, name: name, cat: cat, group: group, icon: icon,
    blurb: o.blurb,
    interventions: o.interventions || [],
    exercises: o.exercises || [],
    equipment: o.equipment || [],
    homeMods: o.homeMods || [],
    activities: o.activities || [],
    outcomes: o.outcomes || '',
    difficulty: o.difficulty || 'Beginner',
    ageGroup: o.ageGroup || 'All ages',
    time: o.time || '15\u201320 min/day',
    safetyTips: pickSafety(o.safety, o.safetyExtra)
  };
}

const TH_ITEMS = [

/* ================= ACTIVITIES OF DAILY LIVING (ADLs) ================= */
I('adl-bathing','Bathing','adl','Activities of Daily Living','fa-bath',{
  blurb:'Washing the body safely and independently, seated or standing.',
  interventions:['Task breakdown into wash zones (upper, lower, back)','Seated bathing technique with transfer training','Grading from full assist to independent wash'],
  exercises:['Shoulder reach drills to simulate washing motions','Seated balance practice before standing rinse'],
  equipment:['Long-handled sponge','Shower chair or bench','Non-slip bath mat'],
  homeMods:['Grab bars at entry and seat height','Handheld shower head on a slide bar'],
  activities:['Practice wash sequence on dry run before water use','Backward chaining: therapist starts, client finishes'],
  outcomes:'Increased independence and reduced fall risk during bathing.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'15\u201320 min/session',
  safety:['bathroom','fall']
}),
I('adl-showering','Showering','adl','Activities of Daily Living','fa-shower',{
  blurb:'Standing or seated showering with safe transfers in and out.',
  interventions:['Shower transfer technique training','Standing tolerance grading','Energy-conserving wash sequence'],
  exercises:['Standing balance holds near a rail','Weight-shifting practice for the shower floor'],
  equipment:['Shower chair','Handheld shower head','Non-slip mat inside and outside shower'],
  homeMods:['Curbless or walk-in shower entry','Grab bars at entry and within the shower'],
  activities:['Rehearse the full in/out transfer with supervision'],
  outcomes:'Safer, more confident independent showering.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'10\u201315 min/session',
  safety:['bathroom','fall']
}),
I('adl-teeth','Brushing Teeth','adl','Activities of Daily Living','fa-tooth',{
  blurb:'Independent tooth brushing despite limited grip or reach.',
  interventions:['Built-up handle grip training','One-handed brushing technique','Electric toothbrush introduction for reduced dexterity'],
  exercises:['Wrist rotation and grip strengthening'],
  equipment:['Built-up foam grip','Electric or angled toothbrush','Suction-base cup for rinsing'],
  homeMods:['Lowered mirror or seated sink access'],
  activities:['Practice full brushing sequence with a visual step chart'],
  outcomes:'Independent, thorough daily oral care.',
  difficulty:'Beginner', ageGroup:'All ages', time:'3\u20135 min, 2x/day',
  safety:['home']
}),
I('adl-oral','Oral Hygiene','adl','Activities of Daily Living','fa-tooth',{
  blurb:'Full mouth-care routine including flossing and denture care.',
  interventions:['Adapted flossing tools for one-handed use','Denture handling and cleaning routine','Sequencing chart for full routine'],
  exercises:['Fine motor pinch practice for floss handling'],
  equipment:['Floss holder/pick','Denture brush with suction base'],
  homeMods:['Accessible storage for oral care items at sink height'],
  activities:['Backward chaining of the full hygiene sequence'],
  outcomes:'Consistent, independent oral hygiene routine.',
  difficulty:'Beginner', ageGroup:'All ages', time:'5\u201310 min/day',
  safety:['home']
}),
I('adl-dress-upper','Dressing Upper Body','adl','Activities of Daily Living','fa-shirt',{
  blurb:'Putting on shirts, bras, and jackets independently, often one-handed.',
  interventions:['Affected-arm-first sequencing','Button hook and zipper pull training','Seated dressing technique'],
  exercises:['Shoulder range-of-motion stretches','Reach-behind-back practice for fasteners'],
  equipment:['Button hook','Zipper pull','Dressing stick'],
  homeMods:['Lowered closet rod','Seating in the dressing area'],
  activities:['Practice with loose-fitting garments before fitted ones'],
  outcomes:'Independent upper body dressing within a realistic time.',
  difficulty:'Beginner', ageGroup:'All ages', time:'10\u201315 min/day',
  safety:['fall']
}),
I('adl-dress-lower','Dressing Lower Body','adl','Activities of Daily Living','fa-socks',{
  blurb:'Putting on pants, socks, and shoes safely, seated or standing.',
  interventions:['Seated lower-body dressing sequence','Sock aid and long-handled shoe horn training','Weight-shift technique for standing to pull up pants'],
  exercises:['Hip and knee range-of-motion practice','Seated balance while leaning to reach feet'],
  equipment:['Sock aid','Long-handled shoe horn','Elastic or one-handed shoelaces'],
  homeMods:['Stable chair at bedside for dressing'],
  activities:['Rehearse the full sequence seated before attempting standing'],
  outcomes:'Safer, more independent lower body dressing.',
  difficulty:'Beginner', ageGroup:'All ages', time:'10\u201315 min/day',
  safety:['fall']
}),
I('adl-grooming','Grooming','adl','Activities of Daily Living','fa-user',{
  blurb:'Shaving, applying makeup, and general appearance care.',
  interventions:['Adapted grip tools for razors and applicators','Seated grooming station setup','Mirror positioning for limited neck rotation'],
  exercises:['Fine motor precision drills with a mirror'],
  equipment:['Electric razor','Built-up handle grooming tools'],
  homeMods:['Adjustable-height, well-lit mirror'],
  activities:['Step-by-step grooming checklist for consistency'],
  outcomes:'Restored confidence and independence in personal appearance.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'10 min/day',
  safety:['home']
}),
I('adl-toileting','Toileting','adl','Activities of Daily Living','fa-toilet',{
  blurb:'Safe, independent, or minimally-assisted toilet use and hygiene.',
  interventions:['Transfer training on/off toilet','Clothing management sequencing','Toileting schedule for cognitive or bladder concerns'],
  exercises:['Sit-to-stand strengthening near the toilet'],
  equipment:['Raised toilet seat','Grab bars','Toilet frame with armrests'],
  homeMods:['Grab bars mounted into studs beside the toilet'],
  activities:['Practice full transfer sequence with supervision first'],
  outcomes:'Safer, more independent toileting with reduced fall risk.',
  difficulty:'Beginner', ageGroup:'All ages', time:'as needed',
  safety:['bathroom','transfer']
}),
I('adl-feeding','Feeding','adl','Activities of Daily Living','fa-utensils',{
  blurb:'Bringing food safely from plate to mouth, including swallowing safety.',
  interventions:['Adapted utensil grip training','Positioning for safe swallowing','Pacing strategies to prevent choking'],
  exercises:['Grip and wrist strengthening for utensil control'],
  equipment:['Built-up handle utensils','Plate guard','Non-slip mat under the plate'],
  homeMods:['Stable, supportive seating at the dining table'],
  activities:['Practice with easier-to-manage foods before harder textures'],
  outcomes:'Safer, more independent, and more confident mealtimes.',
  difficulty:'Beginner', ageGroup:'All ages', time:'each meal',
  safety:['home']
}),
I('adl-mobility','Functional Mobility','adl','Activities of Daily Living','fa-person-walking',{
  blurb:'Moving safely around the home \u2014 walking, turning, and navigating.',
  interventions:['Gait and mobility device training','Home navigation practice','Endurance grading for longer distances'],
  exercises:['Walking endurance intervals','Turning and obstacle-clearance practice'],
  equipment:['Cane, walker, or rollator as indicated','Non-slip footwear'],
  homeMods:['Clear, wide pathways between rooms'],
  activities:['Practice common home routes (bedroom to bathroom to kitchen)'],
  outcomes:'Safer independent movement through the home.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'20\u201330 min/day',
  safety:['fall','home']
}),
I('adl-transfers','Transfers','adl','Activities of Daily Living','fa-person-arrow-up-from-line',{
  blurb:'Moving safely between surfaces \u2014 bed, chair, toilet, and car.',
  interventions:['Stand-pivot transfer training','Sliding board technique for non-weight-bearing transfers','Caregiver-assisted transfer coaching'],
  exercises:['Lower body strengthening for stand-pivot transfers'],
  equipment:['Sliding transfer board','Gait belt','Bed rail'],
  homeMods:['Bed and chair heights matched for easier transfers'],
  activities:['Rehearse each transfer type with supervision before solo attempts'],
  outcomes:'Safer transfers with reduced injury risk to client and caregiver.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'as needed',
  safety:['transfer','caregiver']
}),
I('adl-handwashing','Hand Washing','adl','Activities of Daily Living','fa-hands-bubbles',{
  blurb:'Independent, effective hand hygiene at the sink.',
  interventions:['Reach and sequencing training at the sink','Lever-handle faucet adaptation'],
  exercises:['Wrist and forearm range-of-motion practice'],
  equipment:['Lever-style faucet handles','Pump soap dispenser'],
  homeMods:['Lowered or accessible sink height'],
  activities:['Visual step-by-step handwashing chart'],
  outcomes:'Consistent, independent hand hygiene.',
  difficulty:'Beginner', ageGroup:'All ages', time:'1\u20132 min, several times/day',
  safety:['home']
}),
I('adl-haircare','Hair Care','adl','Activities of Daily Living','fa-scissors',{
  blurb:'Washing, brushing, and styling hair independently.',
  interventions:['Adapted grip brush/comb training','Seated hair-washing technique','Overhead reach grading for brushing'],
  exercises:['Shoulder flexion and reach practice'],
  equipment:['Long-handled brush','Detachable shower head for washing'],
  homeMods:['Seating at the sink or shower for hair washing'],
  activities:['Break the routine into wash, dry, and style stages'],
  outcomes:'Independent hair care and improved self-image.',
  difficulty:'Beginner', ageGroup:'All ages', time:'10\u201315 min',
  safety:['bathroom']
}),
I('adl-nailcare','Nail Care','adl','Activities of Daily Living','fa-hand',{
  blurb:'Trimming and maintaining fingernails and toenails safely.',
  interventions:['Adapted clipper handle training','One-handed nail care technique','Referral pathway for diabetic or high-risk foot care'],
  exercises:['Fine motor precision grip practice'],
  equipment:['Built-up handle clippers','Suction-base emery board'],
  homeMods:['Good lighting and stable seated surface'],
  activities:['Practice on fingernails before progressing to toenails'],
  outcomes:'Safe, independent nail care with reduced injury risk.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'weekly',
  safety:['home','joint']
}),
I('adl-eating','Eating Independently','adl','Activities of Daily Living','fa-utensils',{
  blurb:'Full independent eating, from setup to self-feeding.',
  interventions:['Adapted utensil and cup training','Meal setup independence coaching','One-handed cutting technique'],
  exercises:['Grip endurance practice through a full meal'],
  equipment:['Rocker knife','Plate guard','Two-handled cup'],
  homeMods:['Stable dining setup at appropriate height'],
  activities:['Practice full self-feeding with easier foods first'],
  outcomes:'Full mealtime independence and dignity.',
  difficulty:'Beginner', ageGroup:'All ages', time:'each meal',
  safety:['home']
}),

/* ================= INSTRUMENTAL ADLs (IADLs) ================= */
I('iadl-mealprep','Meal Preparation','iadl','Instrumental Activities of Daily Living','fa-kitchen-set',{
  blurb:'Planning and assembling simple meals safely and efficiently.',
  interventions:['Task simplification and sequencing for meal steps','Seated meal-prep station setup','Energy conservation pacing across a full meal'],
  exercises:['Standing/seated tolerance building at counter height'],
  equipment:['Non-slip cutting board','Jar opener','Lightweight cookware'],
  homeMods:['Frequently used items stored at waist-to-shoulder height'],
  activities:['Start with no-cook meals before progressing to stovetop tasks'],
  outcomes:'Safer, more independent meal preparation.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'20\u201340 min/meal',
  safety:['kitchen','energy']
}),
I('iadl-cooking','Cooking','iadl','Instrumental Activities of Daily Living','fa-fire-burner',{
  blurb:'Using the stove or oven safely to prepare hot meals.',
  interventions:['Stovetop safety training','Rocker knife and one-handed technique for prep','Timer and checklist systems for sequencing'],
  exercises:['Standing tolerance intervals at the stove'],
  equipment:['Rocker knife','Anti-scald oven mitts','Auto shut-off stove timer'],
  homeMods:['Front-mounted stove controls for easier, safer reach'],
  activities:['Practice one dish at a time before multi-step meals'],
  outcomes:'Confident, safe independent cooking.',
  difficulty:'Advanced', ageGroup:'Adults & older adults', time:'30\u201360 min',
  safety:['kitchen','energy']
}),
I('iadl-shopping','Shopping','iadl','Instrumental Activities of Daily Living','fa-cart-shopping',{
  blurb:'Planning for and safely completing grocery or retail shopping.',
  interventions:['List-making and budgeting practice','Community mobility and endurance grading','Simulated shopping trips before real ones'],
  exercises:['Walking endurance for store aisles'],
  equipment:['Rolling shopping cart or trolley bag','Written or picture shopping list'],
  homeMods:['N/A \u2014 community-based task'],
  activities:['Start with a short list at a quiet time of day'],
  outcomes:'Increased confidence and independence in community shopping.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'30\u201360 min',
  safety:['community','fall']
}),
I('iadl-laundry','Laundry','iadl','Instrumental Activities of Daily Living','fa-shirt',{
  blurb:'Washing, drying, folding, and putting away clothing.',
  interventions:['Task sequencing for wash/dry/fold cycle','Energy conservation across the full task','Adapted reach for loading/unloading machines'],
  exercises:['Standing tolerance and reach practice at machine height'],
  equipment:['Long-handled tongs for retrieving items','Rolling laundry cart'],
  homeMods:['Front-loading machines at accessible height'],
  activities:['Break laundry into stages across the day rather than all at once'],
  outcomes:'Manageable, independent laundry routine.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'45\u201360 min total',
  safety:['energy','home']
}),
I('iadl-medication','Medication Management','iadl','Instrumental Activities of Daily Living','fa-pills',{
  blurb:'Taking the right medication, at the right time, safely.',
  interventions:['Pill organiser setup and training','Memory strategy pairing (medication with routine anchor)','Caregiver oversight system for complex regimens'],
  exercises:['Cognitive sequencing practice with a mock schedule'],
  equipment:['Weekly/daily pill organiser','Alarm or reminder app'],
  homeMods:['Consistent, visible medication storage location'],
  activities:['Practice the sorting routine weekly with supervision initially'],
  outcomes:'Safer, more consistent medication adherence.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'5\u201310 min/day',
  safety:['medication','cognitive']
}),
I('iadl-money','Money Management','iadl','Instrumental Activities of Daily Living','fa-money-bill-wave',{
  blurb:'Budgeting, paying bills, and handling money safely.',
  interventions:['Simplified budgeting system setup','Bill payment routine and reminders','Cognitive support for calculation tasks'],
  exercises:['Practice transactions in low-stakes simulated scenarios'],
  equipment:['Large-print calculator','Automatic bill-pay setup'],
  homeMods:['Dedicated, organised space for financial paperwork'],
  activities:['Start with a single recurring bill before full budgeting'],
  outcomes:'Increased confidence and reduced errors in money management.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'varies weekly',
  safety:['cognitive']
}),
I('iadl-transport','Using Transportation','iadl','Instrumental Activities of Daily Living','fa-bus',{
  blurb:'Safely using buses, taxis, or ride-share services in the community.',
  interventions:['Route planning and rehearsal','Trotro/bus stop navigation practice','Communication script for requesting help'],
  exercises:['Community mobility endurance building'],
  equipment:['Transit card or fare app','Printed route card as backup'],
  homeMods:['N/A \u2014 community-based task'],
  activities:['Practice a short, familiar route before longer trips'],
  outcomes:'Greater independence and confidence in community travel.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'varies',
  safety:['community']
}),
I('iadl-driving','Driving Readiness','iadl','Instrumental Activities of Daily Living','fa-car',{
  blurb:'Assessing and rebuilding the skills needed to return to driving safely.',
  interventions:['Clinical driving readiness screening','Reaction time and visual scanning training','Referral to a certified driving rehabilitation specialist'],
  exercises:['Simulated reaction and scanning drills'],
  equipment:['Adaptive driving controls if indicated'],
  homeMods:['N/A'],
  activities:['Progress from simulator or parking-lot practice to road driving'],
  outcomes:'A clear, evidence-based decision on driving readiness.',
  difficulty:'Advanced', ageGroup:'Adults & older adults', time:'formal assessment',
  safety:['driving']
}),
I('iadl-homemgmt','Home Management','iadl','Instrumental Activities of Daily Living','fa-house-chimney-window',{
  blurb:'Overseeing household organisation, repairs, and routine upkeep.',
  interventions:['Household task scheduling system','Delegation and prioritisation coaching','Simplified maintenance checklist'],
  exercises:['Planning and sequencing practice for weekly tasks'],
  equipment:['Wall calendar or task-tracking app'],
  homeMods:['Organised storage for tools and household supplies'],
  activities:['Tackle one room or task category per session'],
  outcomes:'A manageable, sustainable home management routine.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'varies weekly',
  safety:['home','energy']
}),
I('iadl-cleaning','Cleaning','iadl','Instrumental Activities of Daily Living','fa-broom',{
  blurb:'Sweeping, wiping, and tidying living spaces safely.',
  interventions:['Lightweight, long-handled tool training','Task pacing across rooms','Ergonomic technique to protect the back and joints'],
  exercises:['Standing tolerance and reach practice'],
  equipment:['Long-handled duster/mop','Lightweight vacuum'],
  homeMods:['Decluttered surfaces for easier cleaning access'],
  activities:['Clean one zone per day rather than the whole home at once'],
  outcomes:'Sustainable, independent home cleaning routine.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'15\u201330 min/session',
  safety:['energy','joint']
}),
I('iadl-childcare','Child Care','iadl','Instrumental Activities of Daily Living','fa-baby',{
  blurb:'Safely managing feeding, lifting, and supervising a child day-to-day.',
  interventions:['Adapted lifting and carrying technique','Task modification for diapering/feeding','Energy pacing across a full childcare day'],
  exercises:['Core and upper body strengthening for lifting'],
  equipment:['Adjustable-height changing station','Front-carry baby wrap'],
  homeMods:['Childproofing matched to the caregiver\u2019s physical needs'],
  activities:['Rehearse lifting technique with a weighted doll before real use'],
  outcomes:'Safer caregiving for both parent/caregiver and child.',
  difficulty:'Intermediate', ageGroup:'Adults', time:'ongoing daily',
  safety:['child','caregiver']
}),
I('iadl-petcare','Pet Care','iadl','Instrumental Activities of Daily Living','fa-paw',{
  blurb:'Feeding, walking, and caring for a pet within physical limits.',
  interventions:['Adapted leash/handling equipment','Task delegation planning for higher-demand pet needs','Energy pacing for daily walks'],
  exercises:['Grip strengthening for leash control'],
  equipment:['Hands-free or ergonomic leash','Raised feeding bowls'],
  homeMods:['Accessible storage for pet food and supplies'],
  activities:['Start with shorter walks and build duration gradually'],
  outcomes:'Sustainable, safe pet care routine.',
  difficulty:'Beginner', ageGroup:'All ages', time:'varies daily',
  safety:['fall','energy']
}),
I('iadl-phone','Phone Use','iadl','Instrumental Activities of Daily Living','fa-phone',{
  blurb:'Making calls, texting, and using a phone independently.',
  interventions:['Large-icon interface setup','One-handed phone handling technique','Simplified contact/speed-dial system'],
  exercises:['Fine motor tap/swipe precision practice'],
  equipment:['Phone grip or stand','Voice-activated assistant'],
  homeMods:['N/A'],
  activities:['Practice calling a known contact before unfamiliar numbers'],
  outcomes:'Reliable, independent phone communication.',
  difficulty:'Beginner', ageGroup:'All ages', time:'as needed',
  safety:['cognitive']
}),
I('iadl-computer','Computer Skills','iadl','Instrumental Activities of Daily Living','fa-computer',{
  blurb:'Using a computer or tablet for communication, work, or leisure.',
  interventions:['Adapted keyboard/mouse setup','Screen reader or magnification training','Task breakdown for multi-step digital tasks'],
  exercises:['Fine motor precision drills with pointing devices'],
  equipment:['Ergonomic keyboard','Adaptive mouse or trackball','Screen magnification software'],
  homeMods:['Ergonomic desk and monitor height setup'],
  activities:['Start with a single familiar task before new software'],
  outcomes:'Increased digital independence for work, learning, or social contact.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'varies',
  safety:['workplace']
}),
I('iadl-community','Community Participation','iadl','Instrumental Activities of Daily Living','fa-people-group',{
  blurb:'Taking part in worship, social, or civic activities outside the home.',
  interventions:['Graded community outing plan','Social communication coaching for participation','Coordination with community accessibility resources'],
  exercises:['Endurance building for time spent in community settings'],
  equipment:['Mobility aid suited to the venue','Emergency contact card'],
  homeMods:['N/A \u2014 community-based task'],
  activities:['Attend a short, familiar event before longer or new ones'],
  outcomes:'Renewed social connection and community involvement.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'varies',
  safety:['community']
}),

/* ================= PHYSICAL CONDITIONS ================= */
I('cond-arthritis','Arthritis','condition','Physical Conditions','fa-hand-dots',{
  blurb:'Joint pain and stiffness affecting grip, reach, and daily tasks.',
  interventions:['Joint protection education','Custom or prefabricated splinting','Activity pacing and energy conservation coaching'],
  exercises:['Gentle range-of-motion exercises within pain limits','Low-resistance grip strengthening'],
  equipment:['Built-up handle utensils and tools','Jar openers and lever-style handles'],
  homeMods:['Lever-style door and faucet handles'],
  activities:['Warm water hand exercises before fine motor tasks'],
  outcomes:'Reduced joint strain and maintained function despite flare-ups.',
  difficulty:'Beginner', ageGroup:'Adults & older adults', time:'10\u201315 min/day',
  safety:['joint','energy']
}),
I('cond-handinjury','Hand Injury','condition','Physical Conditions','fa-hand-fist',{
  blurb:'Recovering grip, dexterity, and function after a hand or wrist injury.',
  interventions:['Custom splinting per healing phase','Scar management and desensitisation','Graded strengthening within surgeon precautions'],
  exercises:['Tendon gliding exercises','Progressive grip and pinch strengthening with putty'],
  equipment:['Custom or off-the-shelf splint','Therapy putty (soft to firm)'],
  homeMods:['N/A'],
  activities:['Functional task practice (buttoning, writing) as healing allows'],
  outcomes:'Restored hand function within surgeon-cleared limits.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'per hand therapy plan',
  safety:['joint']
}),
I('cond-amputation','Amputation','condition','Physical Conditions','fa-hand-holding-medical',{
  blurb:'Adapting daily tasks and building skills with a limb difference.',
  interventions:['Residual limb desensitisation and care','Prosthetic training and functional integration','One-handed technique training where applicable'],
  exercises:['Residual limb strengthening and positioning'],
  equipment:['Prosthesis (as fitted by prosthetist)','Adaptive one-handed tools'],
  homeMods:['Reorganised storage for one-handed or adapted access'],
  activities:['Practice daily tasks with the prosthesis in graded stages'],
  outcomes:'Increased independence with or without the prosthesis.',
  difficulty:'Advanced', ageGroup:'All ages', time:'per rehab plan',
  safety:['home','fall']
}),

/* ================= NEUROLOGICAL CONDITIONS ================= */
I('cond-stroke','Stroke','condition','Neurological Conditions','fa-brain',{
  blurb:'Rebuilding function on the affected side after a stroke.',
  interventions:['One-handed technique training for daily tasks','Affected-limb re-engagement therapy','Cognitive-communication support if affected'],
  exercises:['Affected-arm range-of-motion and weight-bearing practice','Sit-to-stand and balance retraining'],
  equipment:['Button hook, sock aid, and other one-handed tools','Ankle-foot orthosis if indicated'],
  homeMods:['Grab bars and clear pathways for one-sided mobility'],
  activities:['Task-specific practice of the most valued daily activity first'],
  outcomes:'Regained independence in priority daily activities.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'per rehab plan',
  safety:['fall','transfer']
}),
I('cond-parkinsons','Parkinson\u2019s Disease','condition','Neurological Conditions','fa-person-walking-with-cane',{
  blurb:'Managing tremor, rigidity, and slowed movement in daily tasks.',
  interventions:['Big and fast movement retraining (amplitude-based)','Freezing-of-gait cueing strategies','Early compensatory strategy education'],
  exercises:['Large-amplitude movement drills','Balance and gait training'],
  equipment:['Weighted utensils to dampen tremor','Rollator with visual/auditory cueing'],
  homeMods:['Clear floor markings to reduce freezing episodes'],
  activities:['Practice deliberate, large movements during daily tasks'],
  outcomes:'Maintained function and reduced fall risk over time.',
  difficulty:'Intermediate', ageGroup:'Adults & older adults', time:'ongoing, daily practice',
  safety:['fall','energy']
}),
I('cond-tbi','Traumatic Brain Injury','condition','Neurological Conditions','fa-head-side-cough',{
  blurb:'Rebuilding physical, cognitive, and behavioural function after brain injury.',
  interventions:['Cognitive rehabilitation for memory and attention','Structured routine building','Graded return to daily and community activities'],
  exercises:['Attention and processing speed tasks','Physical retraining as indicated by injury profile'],
  equipment:['Memory notebook or reminder app'],
  homeMods:['Reduced clutter and consistent organisation for orientation'],
  activities:['Simple, structured tasks with clear start/end points'],
  outcomes:'Improved daily function and community reintegration.',
  difficulty:'Advanced', ageGroup:'All ages', time:'per rehab plan',
  safety:['cognitive','fall']
}),
I('cond-sci','Spinal Cord Injury','condition','Neurological Conditions','fa-wheelchair',{
  blurb:'Adapting daily life and mobility after spinal cord injury.',
  interventions:['Wheelchair skills and seating assessment','Adapted technique training for all ADLs','Pressure injury prevention education'],
  exercises:['Upper body strengthening for wheelchair propulsion and transfers'],
  equipment:['Properly fitted wheelchair and cushion','Transfer board'],
  homeMods:['Widened doorways and accessible counter heights'],
  activities:['Practice transfers and wheelchair skills in a safe, supervised space'],
  outcomes:'Maximised independence within the level of injury.',
  difficulty:'Advanced', ageGroup:'All ages', time:'per rehab plan',
  safety:['wheelchair','transfer']
}),

/* ================= DEVELOPMENTAL & BEHAVIOURAL ================= */
I('cond-autism','Autism','condition','Developmental Conditions','fa-puzzle-piece',{
  blurb:'Supporting sensory regulation, routines, and participation for autistic individuals.',
  interventions:['Individual sensory profile assessment','Visual schedule and routine building','Social participation coaching matched to interests'],
  exercises:['Sensory diet activities matched to regulation needs'],
  equipment:['Visual schedule board','Noise-reducing headphones if needed'],
  homeMods:['A designated calm-down space at home'],
  activities:['Structured play-based skill building'],
  outcomes:'Improved regulation and participation in daily routines.',
  difficulty:'Intermediate', ageGroup:'Children & adults', time:'ongoing',
  safety:['sensory']
}),
I('cond-adhd','ADHD','condition','Developmental Conditions','fa-bolt',{
  blurb:'Building executive function and routine skills for attention challenges.',
  interventions:['Executive function coaching (planning, organisation)','Visual timer and checklist systems','Environmental modification to reduce distraction'],
  exercises:['Task-initiation practice with timed prompts'],
  equipment:['Visual timer','Checklist app or whiteboard'],
  homeMods:['Decluttered, low-distraction homework/work space'],
  activities:['Break tasks into short, timed segments with breaks'],
  outcomes:'Improved task completion and daily routine consistency.',
  difficulty:'Beginner', ageGroup:'Children & adults', time:'ongoing daily',
  safety:['cognitive']
}),
I('cond-devdelay','Developmental Delay','condition','Developmental Conditions','fa-child-reaching',{
  blurb:'Supporting a child who has not yet met expected milestones.',
  interventions:['Developmental milestone assessment','Play-based skill-building therapy','Family coaching for home carryover'],
  exercises:['Age-appropriate gross and fine motor play activities'],
  equipment:['Developmentally appropriate toys and tools'],
  homeMods:['Safe, stimulating play space at home'],
  activities:['Short, frequent play-based practice sessions'],
  outcomes:'Progress toward developmental milestones at the child\u2019s pace.',
  difficulty:'Beginner', ageGroup:'Children', time:'20\u201330 min/day',
  safety:['child']
}),
I('cond-cp','Cerebral Palsy','condition','Developmental Conditions','fa-person-walking',{
  blurb:'Supporting motor function, positioning, and daily task participation.',
  interventions:['Positioning and seating assessment','Adaptive technique training for daily tasks','Splinting or orthotic coordination'],
  exercises:['Range-of-motion and postural control exercises'],
  equipment:['Adaptive seating','Splints/orthotics as prescribed'],
  homeMods:['Accessible layout matched to mobility level'],
  activities:['Task-specific practice with adaptive equipment'],
  outcomes:'Maximised participation and function across daily life.',
  difficulty:'Advanced', ageGroup:'Children & adults', time:'per therapy plan',
  safety:['fall','caregiver']
}),
I('cond-spd','Sensory Processing Disorder','condition','Developmental Conditions','fa-ear-listen',{
  blurb:'Managing over- or under-responsiveness to sensory input.',
  interventions:['Individual sensory profile assessment','Sensory diet design','Environmental adaptation for triggers'],
  exercises:['Graded sensory exposure activities'],
  equipment:['Weighted blanket or lap pad','Noise-reducing headphones'],
  homeMods:['Reduced-clutter, adjustable-lighting spaces'],
  activities:['Regular movement breaks built into the daily schedule'],
  outcomes:'Better regulation and reduced sensory-triggered distress.',
  difficulty:'Intermediate', ageGroup:'Children & adults', time:'ongoing',
  safety:['sensory']
}),

/* ================= MENTAL HEALTH ================= */
I('cond-mentalhealth','Mental Health','condition','Mental Health','fa-heart-pulse',{
  blurb:'Supporting daily routines, roles, and activity engagement alongside mental health conditions.',
  interventions:['Routine and sleep hygiene structuring','Meaningful activity engagement planning','Stress management and coping strategy coaching'],
  exercises:['Gentle movement or activity scheduling'],
  equipment:['Daily routine planner or journal'],
  homeMods:['A calm, organised space for daily planning'],
  activities:['Small, achievable daily goals to rebuild routine'],
  outcomes:'Improved daily structure and engagement in meaningful activity.',
  difficulty:'Beginner', ageGroup:'All ages', time:'ongoing',
  safety:['cognitive'],
  safetyExtra:['If you are in crisis, contact Ghana\u2019s National Ambulance Service on 112 or a mental health professional immediately.']
}),

/* ================= AGE-RELATED ================= */
I('age-children','Children','condition','Age-Related','fa-child',{
  blurb:'General OT support for developmental, school, and play needs in childhood.',
  interventions:['Developmental screening','Play-based skill building','School and family collaboration'],
  exercises:['Age-appropriate fine and gross motor play'],
  equipment:['Developmentally appropriate toys and tools'],
  homeMods:['Safe, engaging play space'],
  activities:['Structured play sessions matched to developmental stage'],
  outcomes:'Age-appropriate skill development and school readiness.',
  difficulty:'Beginner', ageGroup:'Children', time:'20\u201330 min/day',
  safety:['child']
}),
I('age-adults','Adults','condition','Age-Related','fa-user-tie',{
  blurb:'General OT support for work, home, and community roles in adulthood.',
  interventions:['Role-based goal setting (work, home, caregiving)','Ergonomic and task modification','Community reintegration planning'],
  exercises:['Task-specific strengthening and endurance building'],
  equipment:['Task-appropriate adaptive equipment'],
  homeMods:['Home layout matched to daily role demands'],
  activities:['Graded return to valued roles and routines'],
  outcomes:'Sustained independence across work, home, and community roles.',
  difficulty:'Intermediate', ageGroup:'Adults', time:'per goals',
  safety:['workplace','energy']
}),
I('age-older','Older Adults','condition','Age-Related','fa-person-cane',{
  blurb:'Maintaining independence and safety as strength, balance, or memory change with age.',
  interventions:['Fall risk and home safety assessment','Energy conservation and pacing education','Cognitive support strategies as needed'],
  exercises:['Balance and lower body strengthening'],
  equipment:['Mobility aid as indicated','Grab bars and raised seating'],
  homeMods:['Improved lighting, grab bars, decluttered pathways'],
  activities:['Gentle, consistent daily movement and routine tasks'],
  outcomes:'Maintained independence and reduced fall or injury risk.',
  difficulty:'Beginner', ageGroup:'Older adults', time:'ongoing daily',
  safety:['fall','energy']
}),

/* ================= CONTEXTS ================= */
I('ctx-workplace','Workplace Injuries','condition','Contexts','fa-briefcase-medical',{
  blurb:'Returning to work safely after an injury, with ergonomic support.',
  interventions:['Workstation ergonomic assessment','Graded return-to-work planning','Task modification for injury precautions'],
  exercises:['Job-specific strengthening and conditioning'],
  equipment:['Ergonomic chair, keyboard, or tool grips'],
  homeMods:['N/A \u2014 workplace-based task'],
  activities:['Simulated work tasks before full return'],
  outcomes:'Safe, sustainable return to work duties.',
  difficulty:'Intermediate', ageGroup:'Adults', time:'per return-to-work plan',
  safety:['workplace','joint']
}),
I('ctx-school','School Challenges','condition','Contexts','fa-school',{
  blurb:'Supporting participation and performance in the classroom.',
  interventions:['Classroom accommodation recommendations','Handwriting and fine motor support','Sensory regulation strategies for the school day'],
  exercises:['Handwriting readiness and pencil grip practice'],
  equipment:['Pencil grips','Slant board for writing tasks'],
  homeMods:['Consistent homework space at home'],
  activities:['Short, structured practice sessions tied to classroom tasks'],
  outcomes:'Improved classroom participation and academic confidence.',
  difficulty:'Beginner', ageGroup:'Children', time:'20\u201330 min/day',
  safety:['sensory','cognitive']
}),
I('ctx-sports','Sports Injuries','condition','Contexts','fa-person-running',{
  blurb:'Returning to sport safely after an upper limb or hand injury.',
  interventions:['Graded return-to-sport strengthening','Sport-specific task simulation','Protective equipment/taping guidance'],
  exercises:['Progressive strengthening within healing timeline'],
  equipment:['Protective splint, brace, or tape as indicated'],
  homeMods:['N/A'],
  activities:['Simulated sport movements before full return to play'],
  outcomes:'Safe return to sport with reduced re-injury risk.',
  difficulty:'Intermediate', ageGroup:'Children & adults', time:'per rehab plan',
  safety:['joint']
}),

/* ================= SKILLS ================= */
I('skill-finemotor','Fine Motor','condition','Skills','fa-hand-pointer',{
  blurb:'Small-muscle hand and finger control for writing, buttons, and utensils.',
  interventions:['Graded fine motor task progression','Pinch and grip strengthening program','Functional task practice tied to daily goals'],
  exercises:['Therapy putty pinch and squeeze sets','Pegboard sorting activities'],
  equipment:['Therapy putty','Pegboard and pegs'],
  homeMods:['N/A'],
  activities:['Short, frequent practice sessions rather than long ones'],
  outcomes:'Improved dexterity and precision for daily tasks.',
  difficulty:'Beginner', ageGroup:'All ages', time:'10\u201315 min/day',
  safety:['home']
}),
I('skill-grossmotor','Gross Motor','condition','Skills','fa-person-running',{
  blurb:'Large-muscle coordination for posture, walking, and whole-body movement.',
  interventions:['Core stability and postural training','Functional movement pattern practice','Balance and coordination progression'],
  exercises:['Standing balance and weight-shift drills','Core strengthening exercises'],
  equipment:['Stable chair or rail for support during practice'],
  homeMods:['Clear floor space for movement practice'],
  activities:['Progress from seated to standing to dynamic movement'],
  outcomes:'Improved coordination, posture, and movement confidence.',
  difficulty:'Beginner', ageGroup:'All ages', time:'15\u201320 min/day',
  safety:['fall']
}),
I('skill-balance','Balance','condition','Skills','fa-scale-balanced',{
  blurb:'Standing and dynamic balance to prevent falls and support mobility.',
  interventions:['Static and dynamic balance training','Fall risk assessment and mitigation','Vestibular exercises if indicated'],
  exercises:['Single-leg stance near support','Weight-shifting and stepping drills'],
  equipment:['Stable rail or countertop for support'],
  homeMods:['Clear, well-lit pathways for practice'],
  activities:['Practice near a wall or rail before progressing to open space'],
  outcomes:'Reduced fall risk and improved standing confidence.',
  difficulty:'Beginner', ageGroup:'All ages', time:'10\u201315 min/day',
  safety:['fall']
}),
I('skill-memory','Memory','condition','Skills','fa-brain',{
  blurb:'Supporting recall and daily memory demands through strategy and structure.',
  interventions:['External memory aid setup (calendars, notebooks)','Memory strategy training (association, repetition)','Routine structuring to reduce memory load'],
  exercises:['Recall practice with graded delay intervals'],
  equipment:['Memory notebook','Labelled storage and reminders'],
  homeMods:['Consistent, labelled organisation throughout the home'],
  activities:['Practice strategies with real daily tasks, not just drills'],
  outcomes:'Improved daily recall and reduced reliance on others.',
  difficulty:'Beginner', ageGroup:'All ages', time:'ongoing',
  safety:['cognitive']
}),
I('skill-execfunction','Executive Function','condition','Skills','fa-list-check',{
  blurb:'Planning, organising, and initiating multi-step daily tasks.',
  interventions:['Task breakdown and checklist training','Planning and prioritisation coaching','Time-management strategy building'],
  exercises:['Practice planning a multi-step task from start to finish'],
  equipment:['Checklist app or whiteboard','Visual timer'],
  homeMods:['Decluttered, organised task spaces'],
  activities:['Start with a familiar, low-stakes multi-step task'],
  outcomes:'Improved independence in planning and completing daily tasks.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'ongoing',
  safety:['cognitive']
}),
I('skill-sensory','Sensory Issues','condition','Skills','fa-hand-sparkles',{
  blurb:'Managing over- or under-sensitivity to touch, sound, light, or movement.',
  interventions:['Sensory profile assessment','Personalised sensory diet','Environmental adaptation for known triggers'],
  exercises:['Graded sensory exposure and regulation activities'],
  equipment:['Noise-reducing headphones','Weighted lap pad or blanket'],
  homeMods:['A quiet, low-stimulation retreat space'],
  activities:['Regular scheduled sensory breaks throughout the day'],
  outcomes:'Improved regulation and reduced sensory-triggered distress.',
  difficulty:'Intermediate', ageGroup:'All ages', time:'ongoing',
  safety:['sensory']
}),
I('skill-handwriting','Handwriting','condition','Skills','fa-pen',{
  blurb:'Legible, efficient handwriting for school or daily written tasks.',
  interventions:['Pencil grip and posture training','Letter formation practice','Fine motor and hand strength building'],
  exercises:['Pre-writing pattern practice','Pinch and grip strengthening'],
  equipment:['Pencil grip','Slant board','Raised-line paper'],
  homeMods:['Consistent, well-lit writing space'],
  activities:['Short, frequent handwriting practice sessions'],
  outcomes:'Improved legibility, speed, and writing endurance.',
  difficulty:'Beginner', ageGroup:'Children', time:'15\u201320 min/day',
  safety:['home']
}),
I('skill-visualperception','Visual Perception','condition','Skills','fa-eye',{
  blurb:'Interpreting and making sense of visual information for daily and school tasks.',
  interventions:['Visual scanning and tracking training','Figure-ground and spatial awareness activities','Compensatory strategy coaching for reading/writing tasks'],
  exercises:['Puzzle and matching activities graded by complexity'],
  equipment:['Visual tracking worksheets','Puzzles and sorting games'],
  homeMods:['Reduced visual clutter in work/study spaces'],
  activities:['Progress from simple to complex visual tasks gradually'],
  outcomes:'Improved accuracy and confidence in visually demanding tasks.',
  difficulty:'Intermediate', ageGroup:'Children & adults', time:'15\u201320 min/day',
  safety:['cognitive']
})

];

window.TH_ITEMS = TH_ITEMS;
window.TH_SAFETY_POOLS = TH_SAFETY_POOLS;
