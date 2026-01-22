// Comprehensive Contractor Quote System - Complete Implementation
// Based on handwritten specifications
import { supabase } from './supabaseClient.js';
export const DEFAULT_TERMS = `
      <div style="font-size: 10px; line-height: 1.4; text-align: justify;">
        <p style="margin-bottom: 8px;"><strong>Purchaser hereby accepts the equipment/products and service described in the scope of work/contract and agrees to pay 1 Stop Bath Shop, LLC the price as described before any unforeseen conditions.</strong></p>
        
        <p style="margin-bottom: 8px;">Materials and work in addition to that described herein will be furnished only on Purchaser's authorization and will be paid by Purchaser as an extra charge.</p>
        
        <p style="margin-bottom: 8px;">Upon failure to pay any sums due here under, Purchaser agrees to pay 1 Stop Bath Shop, LLC interest at the rate of 2 percent (2%) per month (annual rate of 24%) on all outstanding balances.</p>
        
        <p style="margin-bottom: 8px;">1 Stop Bath Shop, LLC shall not be liable for any default caused by events beyond its control, including but not limited to, fire, flood, pandemic, shipping, lightning strikes, accidents, or delays affecting this work or other operations in which it is involved, directly or indirectly.</p>
        
        <p style="margin-bottom: 8px;">Purchaser shall permit 1 Stop Bath Shop, LLC and its representatives reasonable access to the property on which materials/equipment is to be installed. Title to all materials/equipment provided remains with 1 Stop Bath Shop, LLC until all amounts due thereon are paid in full, whether such materials/equipment is affixed to the reality or not, and shall remain personal property and be deemed sever-able without injury to the freehold. On any payment default by Purchaser, or if in 1 Stop Bath Shop, LLC's judgement, reasonably exercised, its equity appears to be imperiled, then, 1 Stop Bath Shop may without further notice enter the premises and remove or resell the materials/equipment and Purchaser shall be liable for any deficiency or loss sustained by 1 Stop Bath Shop, LLC in connection therewith.</p>
        
        <p style="margin-bottom: 8px;">Once the material/equipment is installed/connected to Purchaser's property, Purchaser assumes all risks of loss or damage to such materials/equipment and shall ensure same to fully protect all interests of 1 Stop Bath Shop, LLC, the cost of insurance to be paid for by Purchaser. 1 Stop Bath Shop, LLC carries an MHIC license and liability insurance.</p>
        
        <p style="margin-bottom: 8px;">There are no warranties, expressed or implied, for existing materials/equipment not installed by 1 Stop Bath Shop, LLC.</p>
        
        <p style="margin-bottom: 8px;">There are no warranties, expressed or implied, for materials/equipment not supplied by 1 Stop Bath Shop, LLC.</p>
        
        <p style="margin-bottom: 8px;">All warranty/service call work will be performed during 1 Stop Bath Shop, LLC's normal working hours 8:00am to 5:00pm, Monday through Friday.</p>
        
        <p style="margin-bottom: 8px;">Purchaser is responsible for all costs and reasonable attorney fees incurred by 1 Stop Bath Shop, LLC in connection with any action or proceeding (including arbitration and appeals) arising out of this Agreement, including a collection of any outstanding amounts due, whether or not suit is filed.</p>
        
        <p style="margin-bottom: 8px;">Except as provided herein 1 Stop Bath Shop makes no other representations or warranties, either or implied, including but not limited to, any implied warranties of merchantability or fitness for a particular purpose 1 Stop Bath Shop, LLC expressly disclaims all other warranties. 1 Stop Bath Shop, LLC's maximum liability hereunder shall consist of refunding all money paid to it by Purchaser hereunder subject to removal and return to 1 Stop Bath Shop, LLC of all equipment provided hereunder. Under no circumstances will 1 Stop Bath Shop be liable to Purchaser or any other person for any damages, including, without limitation, any indirect, incidental, special, or consequential damages, expenses, costs, profits, lost savings or earnings, lost or corrupted data, or other liability arising out of or related to this Agreement, or the services or materials/equipment provided hereunder.</p>
        
        <p style="margin-bottom: 8px;">This agreement shall be governed and construed solely according to the internal laws of the State of Maryland, without reference to any conflicts of laws.</p>
        
        <p style="margin-bottom: 8px;">This agreement is the complete and exclusive statement of the agreement between Purchaser and 1 Stop Bath Shop, LLC. and it supersedes all oral and written proposals.</p>
        
        <p style="margin-bottom: 8px;"><strong>Warranty:</strong> The work within this purposely will be performed to the manufacturer's specifications and current industry standards. The material warranties are governed by the manufacturer. 1 Stop Bath Shop, LLC guarantees workmanship for a period of (1) year beginning on the date of completion.</p>
        
        <p style="margin-bottom: 8px;">1 Stop Bath Shop, LLC takes many precautions for dust during the remodeling process. There is, however, dust that escapes while working. 1 Stop Bath Shop, LLC will not be held liable for a house cleaning.</p>
        
        <p style="margin-bottom: 8px;"><strong>***This quote does not cover conditions unforeseen before the job has begun***</strong> (Ex: rotted floors, warped floors, uneven floors, mold or mildew, broken toilet flanges, hidden electrical devices, leaking windows, damage due to infestation, etc.)</p>
        
        <p style="margin-bottom: 8px;"><strong>*** This quote does not cover any permit fees unless otherwise noted***</strong></p>
        
        <p style="margin-bottom: 8px;">This agreement is good for 30 days and at which time is subject to reevaluation by 1 Stop Bath Shop, LLC. Additional adaptations may be made to this agreement with ink notations and initialed by both parties.</p>
        
        <p style="margin-bottom: 8px; font-weight: bold; font-size: 11px;">Terms: 1/3 Deposit is required to order materials and schedule.<br>Final balance due at completion</p>
        
        <p style="margin-bottom: 8px;">The customer has the right to cancel up to 4 days after signing the agreement.</p>
        
        <p style="margin-bottom: 16px;"><strong>1 Stop Bath Shop, LLC MHIC# 135893</strong></p>
        
        <h3 style="font-size: 14px; margin-bottom: 8px;">Acceptance:</h3>
        <p style="margin-bottom: 24px;">As the Purchaser or owner/agent on behalf of the above-mentioned property, I hereby authorize 1 Stop Bath Shop, LLC. to perform work/services specified in this agreement. I agree to meet the terms of payment as specified. I have read and understand the terms and conditions as well as the warranty statements herein this agreement. There are no oral representations related to this agreement not included herein. My signature represents an agreement to the price as well as the terms and conditions.</p>
        
        <div style="margin-top: 40px; border-top: 1px solid #000; display: inline-block; width: 60%; padding-top: 4px;">
          <span style="font-size: 14px;">Signed</span>
        </div>
        <div style="display: inline-block; width: 5%; "></div>
        <div style="border-top: 1px solid #000; display: inline-block; width: 30%; padding-top: 4px;">
          <span style="font-size: 14px;">Date</span>
        </div>
      </div>
`;

export const DEFAULT_QUOTE_DATA = {
  scope_of_work: [
    { id: "1", name: "Tile Shower", price: 0 },
    { id: "2", name: "Tub to Shower Conversion", price: 0 },
    { id: "3", name: "Replacement Tub", price: 0 },
    { id: "4", name: "Replacement Shower", price: 0 },
    { id: "5", name: "Bathroom Remodel", price: 0 }
  ],
  fixture_types: [
    { id: "1", name: "Tub", price: 0 },
    { id: "2", name: "Shower", price: 0 },
    { id: "3", name: "Tub/Shower Combo", price: 0 },
    { id: "4", name: "Lavatory Faucet", price: 0 }
  ],
  trim_colors: [
    { id: "1", name: "Chrome", price: 0 },
    { id: "2", name: "Brushed Nickel", price: 0 },
    { id: "3", name: "Oil Rubbed Bronze", price: 0 },
    { id: "4", name: "Black", price: 0 }
  ],
  accessories_finishes: [
    { id: "1", name: "Chrome", price: 0 },
    { id: "2", name: "Brushed Nickel", price: 0 },
    { id: "3", name: "Oil Rubbed Bronze", price: 0 },
    { id: "4", name: "Black", price: 0 },
    { id: "5", name: "Custom", price: 0 }
  ],
  plumbing_colors: [
    { id: "1", name: "Chrome", price: 0 },
    { id: "2", name: "Brushed Nickel", price: 50 },
    { id: "3", name: "Oil Rubbed Bronze", price: 75 },
    { id: "4", name: "Flat Black", price: 100 },
    { id: "5", name: "Custom", price: 0 }
  ],
  plumbing_styles: [
    { id: "1", name: "Moen", price: 0 },
    { id: "2", name: "Chateau", price: 50 },
    { id: "3", name: "Moen Brushed", price: 25 },
    { id: "4", name: "Moen Glyde", price: 25 },
    { id: "5", name: "Moen Voss", price: 25 },
    { id: "6", name: "Custom", price: 0 }
  ],
  electrical_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Light Almond", price: 5 },
    { id: "3", name: "Ivory", price: 5 },
    { id: "4", name: "Custom", price: 0 }
  ],
  exhaust_fans: [
    { id: "1", name: "Fan Only", price: 100 },
    { id: "2", name: "Fan + Light", price: 150 },
    { id: "3", name: "Fan + Light + Heater", price: 250 }
  ],
  shower_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Almond", price: 25 },
    { id: "3", name: "Biscuit", price: 25 },
    { id: "4", name: "Gray", price: 50 },
    { id: "5", name: "Custom", price: 0 }
  ],
  shower_sizes: [
    { id: "1", name: "60x30", price: 320 },
    { id: "2", name: "54x30", price: 340 },
    { id: "3", name: "72x36", price: 420 }
  ],
  drain_locations: [
    { id: "1", name: "Left", price: 0 },
    { id: "2", name: "Right", price: 0 },
    { id: "3", name: "Center", price: 0 }
  ],
  tub_depths: [
    { id: "1", name: '12"', price: 0 },
    { id: "2", name: '13"', price: 20 },
    { id: "3", name: '15"', price: 40 },
    { id: "4", name: '17"', price: 60 },
    { id: "5", name: '18"', price: 80 }
  ],
  tub_lengths: [
    { id: "1", name: '48"', price: 400 },
    { id: "2", name: '50"', price: 420 },
    { id: "3", name: '52"', price: 440 },
    { id: "4", name: '53"', price: 450 },
    { id: "5", name: '54"', price: 460 },
    { id: "6", name: '55"', price: 470 },
    { id: "7", name: '56"', price: 480 },
    { id: "8", name: '57"', price: 490 },
    { id: "9", name: '58"', price: 500 },
    { id: "10", name: '59"', price: 510 },
    { id: "11", name: '60"', price: 520 }
  ],
  wall_colors: [
    { id: "1", name: "White", price: 0 },
    { id: "2", name: "Gray", price: 25 },
    { id: "3", name: "Almond", price: 25 },
    { id: "4", name: "Biscuit", price: 25 },
    { id: "5", name: "Silver White", price: 50 },
    { id: "6", name: "Basket Weave", price: 75 },
    { id: "7", name: "Lightning", price: 75 },
    { id: "8", name: "Charmeuse", price: 75 },
    { id: "9", name: "Juparana Granite", price: 100 },
    { id: "10", name: "River Rock", price: 75 },
    { id: "11", name: "Brecchia", price: 75 },
    { id: "12", name: "Roman Stone", price: 75 },
    { id: "13", name: "Travertine", price: 75 },
    { id: "14", name: "Other", price: 0 }
  ],
  wall_patterns: [
    { id: "1", name: "Smooth", price: 0 },
    { id: "2", name: "Texture/Brushed", price: 100 },
    { id: "3", name: "3x6 Subway", price: 150 },
    { id: "4", name: "8x8", price: 120 },
    { id: "5", name: "12x12", price: 140 },
    { id: "6", name: "Other", price: 0 }
  ],
  wall_types: [
    { id: "1", name: "Reg Shower", price: 800 },
    { id: "2", name: "Reg Tub", price: 600 },
    { id: "3", name: "Bend Shower", price: 900 },
    { id: "4", name: "Bend Tub", price: 700 }
  ],
  vanity_lengths: [
    { id: "1", name: '18"', price: 300 },
    { id: "2", name: '24"', price: 400 },
    { id: "3", name: '36"', price: 600 },
    { id: "4", name: '42"', price: 700 },
    { id: "5", name: '48"', price: 800 },
    { id: "6", name: '54"', price: 900 },
    { id: "7", name: '60"', price: 1000 },
    { id: "8", name: '78"', price: 1400 }
  ],
  flooring_types: [
    { id: "1", name: "LVP", price: 4 },
    { id: "2", name: "Tile", price: 8 }
  ],
  baseboard_styles: [
    { id: "1", name: 'WM623 - 3¼" Colonial', price: 2.50 },
    { id: "2", name: 'WM713 - 3½" Clamshell', price: 2.75 },
    { id: "3", name: 'WM663 - 3¼" Ogee', price: 2.60 },
    { id: "4", name: "Custom", price: 0 }
  ],
  window_styles: [
    { id: "1", name: 'WM376 - 2⅛" Colonial', price: 2.00 },
    { id: "2", name: 'WM366 - 2¼" Flat Edge', price: 2.10 },
    { id: "3", name: 'WM445 - 3¼" Colonial', price: 2.50 },
    { id: "4", name: "Custom", price: 0 }
  ],
  tile_materials: [
    { id: "1", name: "KERDI ROLL", price: 0 },
    { id: "2", name: "KERDI SHOWER KIT", price: 0 },
    { id: "3", name: "DRAIN GRATE", price: 0 },
    { id: "4", name: "NICHE", price: 0 },
    { id: "5", name: "PAN SHELF", price: 0 },
    { id: "6", name: "SHOWER WALL TILE", price: 0 },
    { id: "7", name: "SHOWER FLOOR TILE / BACK OF NICHE", price: 0 },
    { id: "8", name: "SHOWER PAN", price: 0 },
    { id: "9", name: "SCHLUTER JOLLY", price: 0 },
    { id: "10", name: "SHOWER SILL", price: 0 },
    { id: "11", name: "KERDI BAND", price: 0 },
    { id: "12", name: "LEVELING KIT", price: 0 },
    { id: "13", name: "MOLD MOISTURE DRYWALL", price: 0 },
    { id: "14", name: "DITRA HEAT WIRE / OUTLET", price: 0 },
    { id: "15", name: "DITRA HEAT WIRE", price: 0 },
    { id: "16", name: "DITRA HEAT STAT", price: 0 },
    { id: "17", name: "CORK", price: 0 },
    { id: "18", name: "GROUT", price: 0 },
    { id: "19", name: "COLOR MATCH SILICONE", price: 0 },
    { id: "20", name: "TRIM", price: 0 },
    { id: "21", name: "SHELF", price: 0 },
    { id: "22", name: "DELIVERY SHIPPING", price: 0 }
  ],
  plumbing_materials: [
    { id: "1", name: "CARTRIDGE VALVE", price: 0 },
    { id: "2", name: "TRANSITIONS", price: 0 },
    { id: "3", name: "DROP EAR EL", price: 0 },
    { id: "4", name: "STAPLES PLUG", price: 0 },
    { id: "5", name: "EXTENDERS", price: 0 },
    { id: "6", name: "PIPE / FITTINGS / SOLDER / PRIMER / GLUE PLUMBING", price: 0 },
    { id: "7", name: "SHOWER TRIM KIT", price: 0 },
    { id: "8", name: "HANDHELD SHOWER", price: 0 },
    { id: "9", name: "GRAB BAR", price: 0 },
    { id: "10", name: "BN TUB DRAIN / OVERFLOW TRIM", price: 0 },
    { id: "11", name: "SHOWER DRAIN", price: 0 },
    { id: "12", name: "DROP EL - AZISBN", price: 0 },
    { id: "13", name: "VANITY FAUCET", price: 0 },
    { id: "14", name: "TUB SPOUT", price: 0 },
    { id: "15", name: "VANITY P-TRAP", price: 0 },
    { id: "16", name: "VANITY EXTENSION DRAIN", price: 0 },
    { id: "17", name: "WAX RING", price: 0 },
    { id: "18", name: "TOILET / TOILET SUPPLY LINE", price: 0 },
    { id: "19", name: "VANITY / TOILET SHUT-OFF VALVES", price: 0 },
    { id: "20", name: "TENSION CURTAIN ROD", price: 0 }
  ],
  shelf_types: [
    { id: "1", name: "Single Shelf", price: 0 },
    { id: "2", name: "Double Shelf", price: 0 },
    { id: "3", name: "None", price: 0 }
  ],
  seat_types: [
    { id: "1", name: "Hexagon", price: 0 },
    { id: "2", name: "Bench", price: 0 },
    { id: "3", name: "LH (Left Hand)", price: 0 },
    { id: "4", name: "RH (Right Hand)", price: 0 },
    { id: "5", name: "Folding", price: 0 },
    { id: "6", name: "None", price: 0 }
  ],
  grab_bar_sizes: [
    { id: "1", name: "16\"", price: 0 },
    { id: "2", name: "24\"", price: 0 },
    { id: "3", name: "None", price: 0 }
  ],
  enclosure_types: [
    { id: "1", name: "Curtain Rod - Bowed", price: 0 },
    { id: "2", name: "Curtain Rod - Straight", price: 0 },
    { id: "3", name: "Shower Door", price: 0 }
  ],
  window_kits: [
    { id: "1", name: "Yes", price: 0 },
    { id: "2", name: "No", price: 0 }
  ],
  shower_door_styles: [
    { id: "1", name: "Bypass Slider", price: 0 },
    { id: "2", name: "Panel Pivot", price: 0 },
    { id: "3", name: "Pivot", price: 0 },
    { id: "4", name: "Other", price: 0 }
  ],
  shower_door_thickness: [
    { id: "1", name: "1/4\"", price: 0 },
    { id: "2", name: "3/8\"", price: 0 },
    { id: "3", name: "Other", price: 0 }
  ],
  shower_door_glass_types: [
    { id: "1", name: "Clear", price: 0 },
    { id: "2", name: "Rain", price: 0 },
    { id: "3", name: "Other", price: 0 }
  ],
  trim_baseboard_styles: [
    { id: "1", name: "WM623 3 1/4\" Colonial - Primed", price: 0 },
    { id: "2", name: "WM623 3 1/4\" Colonial - Clear", price: 0 },
    { id: "3", name: "WM713 3 1/4\" Clamshell - Primed", price: 0 },
    { id: "4", name: "WM713 3 1/4\" Clamshell - Clear", price: 0 },
    { id: "5", name: "WM663 3 1/4\" Ogee - Primed", price: 0 },
    { id: "6", name: "WM663 3 1/4\" Ogee - Clear", price: 0 },
    { id: "7", name: "WM163E 5 1/4\" Base w/Cap - Primed", price: 0 },
    { id: "8", name: "WM163E 5 1/4\" Base w/Cap - Clear", price: 0 },
    { id: "9", name: "Other", price: 0 }
  ],
  trim_window_door_styles: [
    { id: "1", name: "WM376 2 1/4\" Colonial - Primed", price: 0 },
    { id: "2", name: "WM376 2 1/4\" Colonial - Clear", price: 0 },
    { id: "3", name: "WM366 2 1/4\" Flat Edge Colonial - Primed", price: 0 },
    { id: "4", name: "WM366 2 1/4\" Flat Edge Colonial - Clear", price: 0 },
    { id: "5", name: "WM445 3 1/4\" Colonial - Primed", price: 0 },
    { id: "6", name: "WM445 3 1/4\" Colonial - Clear", price: 0 },
    { id: "7", name: "WM327 2 1/4\" Clamshell - Primed", price: 0 },
    { id: "8", name: "WM327 2 1/4\" Clamshell - Clear", price: 0 },
    { id: "9", name: "Other", price: 0 }
  ],
  splash_options: [
    { id: "1", name: "Back Splash", price: 0 },
    { id: "2", name: "Left Splash", price: 0 },
    { id: "3", name: "Right Splash", price: 0 }
  ],
  electrical_items: [
    { id: "1", name: "Switch", price: 0 },
    { id: "2", name: "Outlet", price: 0 },
    { id: "3", name: "Recessed Light", price: 0 }
  ],
  accessory_items: [
    { id: "1", name: "Towel Bar", price: 0 },
    { id: "2", name: "Towel Ring", price: 0 },
    { id: "3", name: "T.P. Holder", price: 0 }
  ],
  drywall_paint_items: [
    { id: "1", name: "Drywall (per linear ft)", price: 0 },
    { id: "2", name: "Drywall Sheet", price: 0 },
    { id: "3", name: "Paint - 2 Coats Walls", price: 0 },
    { id: "4", name: "Paint - Trim", price: 0 },
    { id: "5", name: "Paint - Ceiling", price: 0 },
    { id: "6", name: "Point Up Drywall", price: 0 }
  ],
  trim_items: [
    { id: "1", name: "Casing (per linear ft)", price: 0 },
    { id: "2", name: "Baseboard (per linear ft)", price: 0 },
    { id: "3", name: "Qtr Round (per linear ft)", price: 0 },
    { id: "4", name: "Door", price: 0 }
  ]
};

// Dropdown mappings for dynamic admin controls
const DROPDOWN_MAPPINGS = {
  'scope_of_work-select': 'scope_of_work',
  'fixture-type': 'fixture_types',
  'plumbing-color': 'plumbing_colors',
  'plumbing-style': 'plumbing_styles',
  'electrical-color': 'electrical_colors',
  'exhaust-fan': 'exhaust_fans',
  'accessories-finish': 'accessories_finishes',
  'shower-color': 'shower_colors',
  'shower-size': 'shower_sizes',
  'shower-drain': 'drain_locations',
  'tub-depth': 'tub_depths',
  'tub-length': 'tub_lengths',
  'wall-color': 'wall_colors',
  'wall-pattern': 'wall_patterns',
  'wall-type': 'wall_types',
  'vanity-length': 'vanity_lengths',
  'flooring-type': 'flooring_types',
  'trim-color': 'trim_colors',
  'baseboard-style': 'trim_baseboard_styles',
  'window-door-style': 'trim_window_door_styles',
  'window-style': 'window_styles',
  'shelves-type': 'shelf_types',
  'seat-type': 'seat_types',
  'grab-bars-size': 'grab_bar_sizes',
  'grab-bars-size-2': 'grab_bar_sizes',
  'enclosure-type': 'enclosure_types',
  'window-kit': 'window_kits',
  'shower-door-style': 'shower_door_styles',
  'shower-door-thickness': 'shower_door_thickness',
  'shower-door-glass-type': 'shower_door_glass_types'
};

// Checkbox category mappings for dynamic admin controls
const CHECKBOX_MAPPINGS = {
  'tile-materials': 'tile_materials',
  'plumbing-materials': 'plumbing_materials',
  'splash-options': 'splash_options'
};


export let products = { ...DEFAULT_QUOTE_DATA };

// Comprehensive selections object
export let selections = {
  scope_of_work: null,
  demo_items: [],
  demolition_notes: "",
  plumbing_color: "",
  plumbing_style: "",
  plumbing_type: "",
  electrical_color: "",
  fixtures_notes: "",
  exhaust_fan: "",
  switches: 0,
  outlets: 0,
  recessed_lights: 0,
  electrical_notes: "",
  shower_color: "",
  shower_size: "",
  shower_drain: "",
  tub_color: "",
  tub_depth: "",
  tub_length: "",
  tub_width: "",
  tub_drain: "",
  wall_color: "",
  wall_pattern: "",
  wall_type: "",
  vanity_style: "",
  vanity_length: "",
  vanity_drawer: "",
  vanity_combo: "",
  vanity_top_bowl: "",
  vanity_top_holes: "",
  vanity_top_faucets: "",
  vanity_top_splashes: [],
  bathroom_notes: "",
  flooring_type: "",
  flooring_sqft: 0,
  baseboard_style: "",
  baseboard_finish: "",
  window_style: "",
  window_finish: "",
  flooring_notes: ""
};

// Company information (stored globally, editable in admin)
export let company_info = {
  name: "1 Stop Bath Shop",
  address: "",
  mhic: "",
  phone: "",
  email: ""
};

let isAdminMode = false;

// Load/Save to Supabase
export async function loadProductsFromStorage() {
  try {
    // First try to load from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.warn('Supabase load error, falling back to defaults:', error.message);
      products = { ...DEFAULT_QUOTE_DATA };
      return;
    }

    if (data && data.length > 0) {
      // Convert array of {category, items} to object format
      const loadedProducts = {};
      data.forEach(row => {
        if (row.category && row.items) {
          loadedProducts[row.category] = row.items;
        }
      });
      // Merge with defaults to ensure all categories exist
      products = { ...DEFAULT_QUOTE_DATA, ...loadedProducts };
      console.log('Products loaded from Supabase:', Object.keys(loadedProducts).length, 'categories');
    } else {
      // No data in Supabase yet, use defaults and save them
      products = { ...DEFAULT_QUOTE_DATA };
      console.log('No products in Supabase, using defaults');
      await saveProductsToStorage(); // Save defaults to Supabase
    }
  } catch (err) {
    console.error('Error loading products:', err);
    products = { ...DEFAULT_QUOTE_DATA };
  }
}

export async function saveProductsToStorage() {
  try {
    // Save each category as a separate row in Supabase
    for (const [category, items] of Object.entries(products)) {
      const { error } = await supabase
        .from('products')
        .upsert(
          { category: category, items: items },
          { onConflict: 'category' }
        );

      if (error) {
        console.error(`Error saving ${category}:`, error.message);
      }
    }
    console.log('Products saved to Supabase');
  } catch (err) {
    console.error('Error saving products:', err);
  }
}

// Admin
export function loginAdmin(password) {
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  if (password === ADMIN_PASSWORD) {
    isAdminMode = true;
    document.body.classList.add('admin-mode');
    setTimeout(() => injectAdminControlsToAllDropdowns(), 100);
    return true;
  }
  return false;
}

export function logoutAdmin() {
  isAdminMode = false;
  document.body.classList.remove('admin-mode');
  removeAdminControlsFromAllDropdowns();
}

export function isAdmin() {
  return isAdminMode;
}

export function getSelections() {
  return selections;
}


// ... (existing code)


// Add/Delete with sequential ID system
export async function addItem(category, name, price) {
  if (!products[category]) products[category] = [];

  // Find the lowest available ID from 1-100
  const usedIds = new Set(products[category].map(item => parseInt(item.id)));
  let newId = 1;
  while (usedIds.has(newId) && newId <= 100) {
    newId++;
  }

  if (newId > 100) {
    alert('Maximum of 100 items per category reached');
    return;
  }

  products[category].push({ id: String(newId), name, price: parseFloat(price) });

  // Sort by ID to keep them in order
  products[category].sort((a, b) => parseInt(a.id) - parseInt(b.id));

  saveProductsToStorage();
}

export async function deleteItem(category, id) {
  if (!products[category]) return;
  products[category] = products[category].filter(item => item.id !== id);
  saveProductsToStorage();
}

// Renumber all items in all categories to use sequential IDs 1-100
function renumberAllItems() {
  console.log('Renumbering all items to sequential IDs...');

  Object.keys(products).forEach(category => {
    if (Array.isArray(products[category])) {
      products[category].forEach((item, index) => {
        item.id = String(index + 1);
      });
      console.log(`Renumbered ${products[category].length} items in ${category}`);
    }
  });

  saveProductsToStorage();
  console.log('All items renumbered and saved');
}

// Initialize
export async function initializeApp() {
  await loadProductsFromStorage(); // Now async - loads from Supabase
  renumberAllItems(); // Ensure all items have sequential IDs
  buildQuoteSections(); // Build HTML first
  populateScopeOfWork(); // Dynamic Scope of Work
  populateDropdowns(); // Then populate with data
  setupAdminControls();
  setupListeners();
}

function populateScopeOfWork() {
  const container = document.getElementById('scope-of-work-checkboxes');
  if (!container || !products.scope_of_work) return;

  container.innerHTML = products.scope_of_work.map(item => `
    <label style="display: flex; align-items: center; gap: 8px; padding: 10px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
      <input type="checkbox" class="scope-item" value="${item.name.replace(/"/g, '&quot;')}" data-price="${item.price}" style="width: 18px; height: 18px;">
      <span>${item.name}</span>
      ${item.price > 0 ? `<span style="font-size: 0.85em; color: #666;">(+$${item.price.toFixed(2)})</span>` : ''}
    </label>
  `).join('');
}

function populateDropdowns() {
  // Populate all dropdowns using DROPDOWN_MAPPINGS
  Object.entries(DROPDOWN_MAPPINGS).forEach(([selectId, category]) => {
    const select = document.getElementById(selectId);
    if (select && products[category]) {
      const defaultText = select.getAttribute('data-default-text') || '-- Select --';
      select.innerHTML = `<option value="">${defaultText}</option>` +
        products[category].map(item =>
          `<option value="${item.id}">${item.name}${item.price > 0 ? ' (+$' + item.price.toFixed(2) + ')' : item.price < 0 ? ' (-$' + Math.abs(item.price).toFixed(2) + ')' : ''}</option>`
        ).join('');
    }
  });
}

function buildQuoteSections() {
  const container = document.getElementById('quote-sections');
  if (!container) return;

  container.innerHTML = `
    <!-- Section 1: Demolition & Disposal -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🗑️ Demolition & Disposal</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select items to demo:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px;">
          ${['Vanity', 'Vanity Top', 'Toilet', 'Drywall', 'Ceiling', 'Fan', 'Vanity Light', 'Ceiling Lights', 'Tub', 'Shower', 'Floor', 'Door Casing', 'Window Casing', 'Baseboard', 'Bill & List'].map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="demo-item" value="${item}" style="width: 18px; height: 18px;">
              <span>${item}</span>
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Demolition Notes:</label>
          <textarea id="demolition-notes" rows="2" class="select-input" placeholder="Any special demolition requirements or notes..."></textarea>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Demo & Disposal Cost:</label>
          <input type="number" id="demo-disposal-cost" min="0" step="0.01" class="select-input" placeholder="Enter total cost (e.g., 500.00)">
        </div>
      </div>
    </section>

    <!-- Section 2: Fixtures & Finishes -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🚰 Fixtures & Finishes</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Fixture Type:</label>
          <select id="fixture-type" class="select-input">
            <option value="">-- Select --</option>
          </select>
        </div>
        <div class="form-group">
          <label>Plumbing Fixture Color:</label>
          <select id="plumbing-color" class="select-input">
          </select>
        </div>
        <div class="form-group">
          <label>Plumbing Fixture Style:</label>
          <select id="plumbing-style" class="select-input">
          </select>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Fixtures & Finishes Notes:</label>
          <textarea id="fixtures-notes" rows="2" class="select-input" placeholder="Any special fixture or finish requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 3: Electrical -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">⚡ Electrical</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Exhaust Fan Type:</label>
          <select id="exhaust-fan" class="select-input">
          </select>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div class="form-group">
            <label>Switches:</label>
            <input type="number" id="switches" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Outlets:</label>
            <input type="number" id="outlets" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Recessed Lights:</label>
            <input type="number" id="recessed-lights" min="0" class="select-input" placeholder="How many?">
        </div>
        <div class="form-group">
          <label>Device Color:</label>
          <select id="electrical-color" class="select-input">
          </select>
        </div>
        <div class="form-group">
          <label>Electrical Notes:</label>
          <textarea id="electrical-notes" rows="2" class="select-input" placeholder="Any special electrical requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 4: Acrylics (Shower Pan, Bathtub, Walls) -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🛁 Acrylics</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Shower Pan</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="shower-color" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Size:</label>
            <select id="shower-size" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Drain Location:</label>
            <select id="shower-drain" class="select-input">
          </select>
          </div>

          <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151;">Bathtub</h3>
          <div class="form-group">
            <label>Depth:</label>
            <select id="tub-depth" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Length:</label>
            <select id="tub-length" class="select-input">
          </select>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px; font-size: 1.1rem; color: #374151;">Walls</h3>
          <div class="form-group">
            <label>Color:</label>
            <select id="wall-color" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Pattern:</label>
            <select id="wall-pattern" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Wall Type:</label>
            <select id="wall-type" class="select-input">
          </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 20px; grid-column: 1 / -1;">
          <label>Acrylics Notes:</label>
          <textarea id="bathroom-notes" rows="2" class="select-input" placeholder="Any special requirements for shower pan, bathtub, or walls..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 5: Options -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">⚙️ Options</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Shower Head:</label>
            <select id="shower-head" class="select-input">
              <option value="">-- Select --</option>
              <option value="standard">Standard</option>
              <option value="handheld">Handheld</option>
            </select>
          </div>
          <div class="form-group">
            <label>Trim Color:</label>
            <select id="trim-color" class="select-input">
              <option value="">-- Select --</option>
            </select>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Shelves:</label>
            <select id="shelves-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Shelf</option>
              <option value="double">Double Shelf</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Shelves:</label>
            <input type="number" id="shelves-qty" min="0" max="10" class="select-input" placeholder="How many?">
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Seat:</label>
            <select id="seat-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="hexagon">Hexagon</option>
              <option value="bench">Bench</option>
              <option value="lh">LH (Left Hand)</option>
              <option value="rh">RH (Right Hand)</option>
              <option value="folding">Folding</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grab Bars Size:</label>
            <select id="grab-bars-size" class="select-input">
              <option value="">-- Select --</option>
              <option value="16">16"</option>
              <option value="24">24"</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grab Bars Size (2):</label>
            <select id="grab-bars-size-2" class="select-input">
              <option value="">-- Select --</option>
              <option value="16">16"</option>
              <option value="24">24"</option>
              <option value="none">None</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Grab Bars:</label>
            <input type="number" id="grab-bars-qty" min="0" max="10" class="select-input" placeholder="How many?">
          </div>
        </div>


        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 16px;">
          <div class="form-group">
            <label>Enclosure:</label>
            <select id="enclosure-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="curtain-bowed">Curtain Rod - Bowed</option>
              <option value="curtain-straight">Curtain Rod - Straight</option>
              <option value="shower-door">Shower Door</option>
            </select>
          </div>
          <div class="form-group">
            <label>Window Kit:</label>
            <select id="window-kit" class="select-input">
              <option value="">-- Select --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        
        <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151; border-top: 1px solid #e5e7eb; padding-top: 16px;">Shower Door</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Style:</label>
            <select id="shower-door-style" class="select-input">
              <option value="">-- Select --</option>
              <option value="bypass-slider">Bypass Slider</option>
              <option value="panel-pivot">Panel Pivot</option>
              <option value="pivot">Pivot</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Glass Type:</label>
            <select id="shower-door-glass-type" class="select-input">
              <option value="">-- Select --</option>
              <option value="clear">Clear</option>
              <option value="rain">Rain</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Glass Thickness:</label>
            <select id="shower-door-thickness" class="select-input">
              <option value="">-- Select --</option>
              <option value="1/4">1/4"</option>
              <option value="3/8">3/8"</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div class="form-group" style="margin-top: 16px;">
          <label>Options Notes:</label>
          <textarea id="options-notes" rows="2" class="select-input" placeholder="Any special requirements for shower options..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 6: Cabinetry -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🪵 Cabinetry</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div class="form-group">
          <label>Vanity Length:</label>
          <select id="vanity-length" class="select-input">
          </select>
        </div>
        
        <h3 style="margin: 20px 0 12px; font-size: 1.1rem; color: #374151; border-top: 1px solid #e5e7eb; padding-top: 16px;">Vanity Top</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div class="form-group">
            <label>Bowl Style:</label>
            <select id="vanity-top-bowl" class="select-input">
              <option value="">-- Select --</option>
              <option value="oval">Oval Bowl</option>
              <option value="square">Square Bowl</option>
            </select>
          </div>
          <div class="form-group">
            <label>Faucet Drill:</label>
            <select id="vanity-top-drill" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Hole</option>
              <option value="4inch">4" Drill</option>
              <option value="8inch">8" Drill</option>
            </select>
          </div>
          <div class="form-group">
            <label>Faucet Count:</label>
            <select id="vanity-top-faucets" class="select-input">
              <option value="">-- Select --</option>
              <option value="single">Single Faucet</option>
              <option value="double">2 Faucets</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
          <label>Splash Options:</label>
          <div id="splash-options" style="display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px;">
            ${products.splash_options.map(item => `
              <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
                <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
                <span>${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <div class="form-group" style="margin-top: 16px;">
          <label>Cabinetry Notes:</label>
          <textarea id="cabinetry-notes" rows="2" class="select-input" placeholder="Any special requirements for vanity or cabinetry..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 8: Accessories -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🧴 Accessories</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Towel Bar:</label>
            <input type="number" id="towel-bar-qty" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>Towel Ring:</label>
            <input type="number" id="towel-ring-qty" min="0" class="select-input" placeholder="How many?">
          </div>
          <div class="form-group">
            <label>T.P. Holder:</label>
            <input type="number" id="tp-holder-qty" min="0" class="select-input" placeholder="How many?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Accessories Finish:</label>
          <select id="accessories-finish" class="select-input" data-default-text="-- Same as Plumbing Fixtures --">
            <option value="">-- Same as Plumbing Fixtures --</option>
          </select>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Accessories Notes:</label>
          <textarea id="accessories-notes" rows="2" class="select-input" placeholder="Any special requirements for accessories..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 9: Drywall & Paint -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🎨 Drywall & Paint</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Drywall Linear Footage:</label>
            <input type="number" id="drywall-linear-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Drywall Sheets:</label>
            <input type="number" id="drywall-sheets" min="0" class="select-input" placeholder="How many sheets?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label style="font-weight: 600; margin-bottom: 12px; display: block;">Paint Work:</label>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-walls" style="width: 18px; height: 18px;"> 2 Coats Walls
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-trim" style="width: 18px; height: 18px;"> Trim Paint
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="paint-ceiling" style="width: 18px; height: 18px;"> Ceiling
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-weight: normal; padding: 8px; background: #f9fafb; border-radius: 6px;">
              <input type="checkbox" id="point-up-drywall" style="width: 18px; height: 18px;"> Point Up Drywall
            </label>
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Drywall & Paint Notes:</label>
          <textarea id="drywall-notes" rows="2" class="select-input" placeholder="Any special requirements for drywall or paint..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 10: Trim -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #c471f5 0%, #fa71cd 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🪵 Trim</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Baseboard Style:</label>
            <select id="baseboard-style" class="select-input">
              <option value="">-- Select --</option>
            </select>
          </div>
          <div class="form-group">
            <label>Window/Door Style:</label>
            <select id="window-door-style" class="select-input">
              <option value="">-- Select --</option>
            </select>
          </div>
          <div class="form-group">
            <label>Casing (Linear Ft):</label>
            <input type="number" id="trim-casing-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Baseboard (Linear Ft):</label>
            <input type="number" id="trim-baseboard-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Qtr Round (Linear Ft):</label>
            <input type="number" id="trim-qtr-round-ft" min="0" class="select-input" placeholder="Linear feet">
          </div>
          <div class="form-group">
            <label>Doors (Qty):</label>
            <input type="number" id="trim-doors-qty" min="0" class="select-input" placeholder="How many?">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Trim Notes:</label>
          <textarea id="trim-notes" rows="2" class="select-input" placeholder="Any special requirements for trim..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 11: Flooring -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔨 Flooring</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label>Flooring Type:</label>
            <select id="flooring-type" class="select-input">
          </select>
          </div>
          <div class="form-group">
            <label>Square Footage:</label>
            <input type="number" id="flooring-sqft" min="0" class="select-input" placeholder="Enter sq ft">
          </div>
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Flooring Notes:</label>
          <textarea id="flooring-notes" rows="2" class="select-input" placeholder="Any special flooring requirements..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 12: Tile -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔧 Tile</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select materials and quantities:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px;">
          ${products.tile_materials.map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 14px;">${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </div>
              <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Tile Notes:</label>
          <textarea id="tile-notes" rows="2" class="select-input" placeholder="Any special requirements for tile work or materials..."></textarea>
        </div>
      </div>
    </section>

    <!-- Section 13: Plumbing -->
    <section class="card collapsible-section" style="margin-bottom: 16px;">
      <div class="section-header" onclick="toggleSection(this)" style="cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 16px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; border-radius: 12px; margin: -16px -16px 16px -16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">🔧 Plumbing</h2>
        <span class="toggle-icon" style="font-size: 1.5rem;">▼</span>
      </div>
      <div class="section-content">
        <label style="font-weight: 600; margin-bottom: 12px; display: block;">Select materials and quantities:</label>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px;">
          ${products.plumbing_materials.map(item => `
            <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
              <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 14px;">${item.name}</span>
                <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
              </div>
              <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
            </label>
          `).join('')}
        </div>
        <div class="form-group" style="margin-top: 16px;">
          <label>Plumbing Notes:</label>
          <textarea id="plumbing-notes" rows="2" class="select-input" placeholder="Any special requirements for plumbing materials..."></textarea>
        </div>
      </div>
    </section>
  `;

  // Make toggle function global
  window.toggleSection = function (header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.textContent = '▼';
    } else {
      content.style.display = 'none';
      icon.textContent = '▶';
    }
  };
}

function setupListeners() {
  // Scope of work
  document.getElementById('scope_of_work-select')?.addEventListener('change', updateSummary);

  // All other inputs
  const inputs = [
    'plumbing-color', 'plumbing-style', 'electrical-color', 'exhaust-fan',
    'switches', 'outlets', 'recessed-lights', 'electrical-notes',
    'demolition-notes', 'demo-disposal-cost', 'fixtures-notes', 'bathroom-notes', 'flooring-notes',
    'shower-color', 'shower-size', 'shower-drain',
    'tub-depth', 'tub-length',
    'wall-color', 'wall-pattern', 'wall-type',
    'vanity-length', 'flooring-type', 'flooring-sqft',
    'baseboard-style', 'window-door-style', 'window-style',
    'grab-bars-size', 'grab-bars-qty', 'grab-bars-size-2',
    'shower-door-style', 'shower-door-thickness', 'shower-door-glass-type',
    // Options section
    'shelves-type', 'shelves-qty',
    // Vanity Top section
    'vanity-top-bowl', 'vanity-top-drill', 'vanity-top-faucets',
    // Accessories section
    'towel-bar-qty', 'towel-ring-qty', 'tp-holder-qty', 'accessories-finish', 'accessories-notes',
    // Drywall & Paint section
    'drywall-linear-ft', 'drywall-sheets', 'drywall-notes',
    'paint-walls', 'paint-trim', 'paint-ceiling', 'point-up-drywall',
    // Trim section
    'trim-casing-ft', 'trim-baseboard-ft', 'trim-qtr-round-ft', 'trim-doors-qty', 'trim-notes'
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateSummary);
  });

  // Checkboxes (including demo, tile, and plumbing items)
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      // If checked and qty is 0/empty, set to 1 for tile/plumbing items
      if (e.target.checked) {
        if (e.target.classList.contains('tile-item')) {
          const item = products.tile_materials.find(p => p.id === e.target.value);
          if (item) {
            const qtyInput = document.querySelector(`.tile-qty[data-item="${item.id}"]`);
            if (qtyInput && (qtyInput.value === '' || qtyInput.value === '0')) {
              qtyInput.value = 1;
            }
          }
        } else if (e.target.classList.contains('plumbing-item')) {
          const item = products.plumbing_materials.find(p => p.id === e.target.value);
          if (item) {
            const qtyInput = document.querySelector(`.plumbing-qty[data-item="${item.id}"]`);
            if (qtyInput && (qtyInput.value === '' || qtyInput.value === '0')) {
              qtyInput.value = 1;
            }
          }
        }
      }
      updateSummary();
    });
  });

  // Quantity inputs for tile and plumbing
  const qtyInputs = document.querySelectorAll('.tile-qty, .plumbing-qty');
  qtyInputs.forEach(input => {
    input.addEventListener('input', updateSummary);
  });
}

function updateSummary() {
  // Update selections
  // selections.scope_of_work = getSelectedItem('scope_of_work-select', products.scope_of_work);
  const scopeItems = Array.from(document.querySelectorAll('.scope-item:checked')).map(cb => cb.value);
  selections.scope_of_work = scopeItems.join(', ');
  selections.demo_items = Array.from(document.querySelectorAll('.demo-item:checked')).map(cb => cb.value);

  // Define all labels for display and selection update
  const fieldMapping = {
    'plumbing-color': { key: 'plumbing_color', label: 'Plumbing Color' },
    'plumbing-style': { key: 'plumbing_style', label: 'Plumbing Style' },
    'electrical-color': { key: 'electrical_color', label: 'Electrical Color' },
    'exhaust-fan': { key: 'exhaust_fan', label: 'Exhaust Fan' },
    'shower-color': { key: 'shower_color', label: 'Shower Color' },
    'shower-size': { key: 'shower_size', label: 'Shower Size' },
    'shower-drain': { key: 'shower_drain', label: 'Shower Drain Location' },
    'tub-depth': { key: 'tub_depth', label: 'Tub Depth' },
    'tub-length': { key: 'tub_length', label: 'Tub Length' },
    'wall-color': { key: 'wall_color', label: 'Wall Color' },
    'wall-pattern': { key: 'wall_pattern', label: 'Wall Pattern' },
    'wall-type': { key: 'wall_type', label: 'Wall Type' },
    'vanity-length': { key: 'vanity_length', label: 'Vanity Length' },
    'flooring-type': { key: 'flooring_type', label: 'Flooring Type' },
    'baseboard-style': { key: 'baseboard_style', label: 'Baseboard Style' },
    'window-door-style': { key: 'window_door_style', label: 'Window/Door Trim Style' },
    'window-style': { key: 'window_style', label: 'Window Style' },
    'grab-bars-size': { key: 'grab_bars_size', label: 'Grab Bars Size' },
    'grab-bars-size-2': { key: 'grab_bars_size_2', label: 'Grab Bars Size (2)' },
    'shower-door-style': { key: 'shower_door_style', label: 'Shower Door Style' },
    'shower-door-thickness': { key: 'shower_door_thickness', label: 'Shower Door Thickness' },
    'shower-door-glass-type': { key: 'shower_door_glass_type', label: 'Shower Door Glass Type' },
  };

  // Build summary
  let html = '';
  let total = 0;

  // Sync generic inputs to selections state
  Object.entries(fieldMapping).forEach(([id, config]) => {
    const el = document.getElementById(id);
    if (el) {
      selections[config.key] = el.value;
    }
  });

  // Add Scope of Work first if selected
  if (selections.scope_of_work) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Scope of Work:</strong> ${selections.scope_of_work}
    </div>`;
  }

  // Add demolition items
  if (selections.demo_items && selections.demo_items.length > 0) {
    html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
      <strong>Demolition Items:</strong> ${selections.demo_items.join(', ')}
    </div>`;
  }

  // Add demo & disposal cost
  const demoDisposalCost = document.getElementById('demo-disposal-cost');
  if (demoDisposalCost && demoDisposalCost.value) {
    const cost = parseFloat(demoDisposalCost.value) || 0;
    if (cost > 0) {
      total += cost;
      html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
        <strong>Demo & Disposal Cost:</strong> $${cost.toFixed(2)}
      </div>`;
      selections.demo_disposal_cost = cost;
    }
  }

  // Calculate Tile Materials
  const tileCheckboxes = document.querySelectorAll('.tile-item:checked');
  if (tileCheckboxes.length > 0) {
    let tileHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Tile Materials:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';
    tileCheckboxes.forEach(cb => {
      const item = products.tile_materials.find(p => p.id === cb.value);
      if (item) {
        const qtyInput = document.querySelector(`.tile-qty[data-item="${item.id}"]`);
        const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;
        if (qty > 0) {
          const cost = item.price * qty;
          total += cost;
          tileHtml += `<li>${item.name} (x${qty}) - $${cost.toFixed(2)}</li>`;
          selections[`tile_material_${item.id}`] = `${item.name} (x${qty})`;
        }
      }
    });
    tileHtml += '</ul></div>';
    if (tileHtml.includes('<li>')) html += tileHtml;
  }

  // Calculate Plumbing Materials
  const plumbingCheckboxes = document.querySelectorAll('.plumbing-item:checked');
  if (plumbingCheckboxes.length > 0) {
    let plumbingHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Plumbing Materials:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';
    plumbingCheckboxes.forEach(cb => {
      const item = products.plumbing_materials.find(p => p.id === cb.value);
      if (item) {
        const qtyInput = document.querySelector(`.plumbing-qty[data-item="${item.id}"]`);
        const qty = qtyInput ? parseInt(qtyInput.value) || 0 : 0;
        if (qty > 0) {
          const cost = item.price * qty;
          total += cost;
          plumbingHtml += `<li>${item.name} (x${qty}) - $${cost.toFixed(2)}</li>`;
          selections[`plumbing_material_${item.id}`] = `${item.name} (x${qty})`;
        }
      }
    });
    plumbingHtml += '</ul></div>';
    if (plumbingHtml.includes('<li>')) html += plumbingHtml;
  }

  // Calculate Options Section - Shelves
  const shelvesType = document.getElementById('shelves-type');
  const shelvesQty = document.getElementById('shelves-qty');
  if (shelvesType && shelvesType.value && shelvesQty && shelvesQty.value) {
    const qty = parseInt(shelvesQty.value) || 0;
    if (qty > 0) {
      const selectedOption = shelvesType.options[shelvesType.selectedIndex];
      const item = products.shelf_types?.find(p => p.id === shelvesType.value);
      if (item) {
        const cost = item.price * qty;
        total += cost;
        html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
          <strong>Shelves:</strong> ${item.name} (x${qty}) - $${cost.toFixed(2)}
        </div>`;
        selections.shelves = `${item.name} (x${qty})`;
      }
    }
  }

  // Calculate Options Section - Grab Bars
  const grabBarsSize = document.getElementById('grab-bars-size');
  const grabBarsSize2 = document.getElementById('grab-bars-size-2');
  const grabBarsQty = document.getElementById('grab-bars-qty');
  if (grabBarsQty && grabBarsQty.value) {
    const qty = parseInt(grabBarsQty.value) || 0;
    if (qty > 0) {
      let grabBarsHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Grab Bars:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';
      let hasGrabBars = false;

      if (grabBarsSize && grabBarsSize.value) {
        const item = products.grab_bar_sizes?.find(p => p.id === grabBarsSize.value);
        if (item && item.name !== 'None') {
          const cost = item.price * qty;
          total += cost;
          grabBarsHtml += `<li>${item.name} Grab Bar (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasGrabBars = true;
        }
      }

      if (grabBarsSize2 && grabBarsSize2.value) {
        const item = products.grab_bar_sizes?.find(p => p.id === grabBarsSize2.value);
        if (item && item.name !== 'None') {
          const cost = item.price * qty;
          total += cost;
          grabBarsHtml += `<li>${item.name} Grab Bar (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasGrabBars = true;
        }
      }

      grabBarsHtml += '</ul></div>';
      if (hasGrabBars) html += grabBarsHtml;
    }
  }

  // Calculate Electrical Section
  const switches = document.getElementById('switches');
  const outlets = document.getElementById('outlets');
  const recessedLights = document.getElementById('recessed-lights');
  const electricalNotes = document.getElementById('electrical-notes');

  let electricalHtml = '';
  let hasElectrical = false;

  if ((switches && switches.value) || (outlets && outlets.value) || (recessedLights && recessedLights.value)) {
    electricalHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Electrical:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (switches && switches.value) {
      const qty = parseInt(switches.value) || 0;
      if (qty > 0) {
        const item = products.electrical_items?.find(p => p.name === 'Switch');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          electricalHtml += `<li>Switches (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasElectrical = true;
          selections.switches = qty;
        }
      }
    }

    if (outlets && outlets.value) {
      const qty = parseInt(outlets.value) || 0;
      if (qty > 0) {
        const item = products.electrical_items?.find(p => p.name === 'Outlet');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          electricalHtml += `<li>Outlets (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasElectrical = true;
          selections.outlets = qty;
        }
      }
    }

    if (recessedLights && recessedLights.value) {
      const qty = parseInt(recessedLights.value) || 0;
      if (qty > 0) {
        const item = products.electrical_items?.find(p => p.name === 'Recessed Light');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          electricalHtml += `<li>Recessed Lights (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasElectrical = true;
          selections.recessed_lights = qty;
        }
      }
    }

    electricalHtml += '</ul>';

    if (electricalNotes && electricalNotes.value.trim()) {
      electricalHtml += `<div style="margin-top: 6px; font-size: 13px; color: #6b7280;"><em>Notes: ${electricalNotes.value.trim()}</em></div>`;
      selections.electrical_notes = electricalNotes.value.trim();
    }

    electricalHtml += '</div>';
    if (hasElectrical) html += electricalHtml;
  }

  // Calculate Vanity Top Section
  const vanityTopBowl = document.getElementById('vanity-top-bowl');
  const vanityTopDrill = document.getElementById('vanity-top-drill');
  const vanityTopFaucets = document.getElementById('vanity-top-faucets');
  const splashOptions = document.querySelectorAll('.splash-option:checked');

  let vanityTopHtml = '';
  let hasVanityTop = false;

  if ((vanityTopBowl && vanityTopBowl.value) || (vanityTopDrill && vanityTopDrill.value) || (vanityTopFaucets && vanityTopFaucets.value) || splashOptions.length > 0) {
    vanityTopHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Vanity Top:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (vanityTopBowl && vanityTopBowl.value) {
      vanityTopHtml += `<li>Bowl Style: ${vanityTopBowl.options[vanityTopBowl.selectedIndex].text}</li>`;
      hasVanityTop = true;
    }

    if (vanityTopDrill && vanityTopDrill.value) {
      vanityTopHtml += `<li>Faucet Drill: ${vanityTopDrill.options[vanityTopDrill.selectedIndex].text}</li>`;
      hasVanityTop = true;
    }

    if (vanityTopFaucets && vanityTopFaucets.value) {
      vanityTopHtml += `<li>Faucet Count: ${vanityTopFaucets.options[vanityTopFaucets.selectedIndex].text}</li>`;
      hasVanityTop = true;
    }

    if (splashOptions.length > 0) {
      splashOptions.forEach(cb => {
        const item = products.splash_options?.find(p => p.id === cb.value);
        if (item) {
          const cost = item.price;
          total += cost;
          vanityTopHtml += `<li>${item.name} - $${cost.toFixed(2)}</li>`;
          hasVanityTop = true;
        }
      });
    }

    vanityTopHtml += '</ul></div>';
    if (hasVanityTop) html += vanityTopHtml;
  }

  // Calculate Accessories Section
  const towelBarQty = document.getElementById('towel-bar-qty');
  const towelRingQty = document.getElementById('towel-ring-qty');
  const tpHolderQty = document.getElementById('tp-holder-qty');
  const accessoriesFinish = document.getElementById('accessories-finish');
  const accessoriesNotes = document.getElementById('accessories-notes');

  let accessoriesHtml = '';
  let hasAccessories = false;

  if ((towelBarQty && towelBarQty.value) || (towelRingQty && towelRingQty.value) || (tpHolderQty && tpHolderQty.value)) {
    accessoriesHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Accessories:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (towelBarQty && towelBarQty.value) {
      const qty = parseInt(towelBarQty.value) || 0;
      if (qty > 0) {
        const item = products.accessory_items?.find(p => p.name === 'Towel Bar');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          accessoriesHtml += `<li>Towel Bar (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasAccessories = true;
        }
      }
    }

    if (towelRingQty && towelRingQty.value) {
      const qty = parseInt(towelRingQty.value) || 0;
      if (qty > 0) {
        const item = products.accessory_items?.find(p => p.name === 'Towel Ring');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          accessoriesHtml += `<li>Towel Ring (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasAccessories = true;
        }
      }
    }

    if (tpHolderQty && tpHolderQty.value) {
      const qty = parseInt(tpHolderQty.value) || 0;
      if (qty > 0) {
        const item = products.accessory_items?.find(p => p.name === 'T.P. Holder');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          accessoriesHtml += `<li>T.P. Holder (x${qty}) - $${cost.toFixed(2)}</li>`;
          hasAccessories = true;
        }
      }
    }

    if (accessoriesFinish && accessoriesFinish.value) {
      accessoriesHtml += `<li>Finish: ${accessoriesFinish.options[accessoriesFinish.selectedIndex].text}</li>`;
    }

    accessoriesHtml += '</ul>';

    if (accessoriesNotes && accessoriesNotes.value.trim()) {
      accessoriesHtml += `<div style="margin-top: 6px; font-size: 13px; color: #6b7280;"><em>Notes: ${accessoriesNotes.value.trim()}</em></div>`;
    }

    accessoriesHtml += '</div>';
    if (hasAccessories) html += accessoriesHtml;
  }

  // Calculate Drywall & Paint Section
  const drywallLinearFt = document.getElementById('drywall-linear-ft');
  const drywallSheets = document.getElementById('drywall-sheets');
  const paintWalls = document.getElementById('paint-walls');
  const paintTrim = document.getElementById('paint-trim');
  const paintCeiling = document.getElementById('paint-ceiling');
  const pointUpDrywall = document.getElementById('point-up-drywall');
  const drywallNotes = document.getElementById('drywall-notes');

  let drywallHtml = '';
  let hasDrywall = false;

  if ((drywallLinearFt && drywallLinearFt.value) || (drywallSheets && drywallSheets.value) ||
    (paintWalls && paintWalls.checked) || (paintTrim && paintTrim.checked) ||
    (paintCeiling && paintCeiling.checked) || (pointUpDrywall && pointUpDrywall.checked)) {
    drywallHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Drywall & Paint:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (drywallLinearFt && drywallLinearFt.value) {
      const qty = parseInt(drywallLinearFt.value) || 0;
      if (qty > 0) {
        const item = products.drywall_paint_items?.find(p => p.name === 'Drywall (per linear ft)');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          drywallHtml += `<li>Drywall Linear Footage: ${qty} ft - $${cost.toFixed(2)}</li>`;
          hasDrywall = true;
        }
      }
    }

    if (drywallSheets && drywallSheets.value) {
      const qty = parseInt(drywallSheets.value) || 0;
      if (qty > 0) {
        const item = products.drywall_paint_items?.find(p => p.name === 'Drywall Sheet');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          drywallHtml += `<li>Drywall Sheets: ${qty} - $${cost.toFixed(2)}</li>`;
          hasDrywall = true;
        }
      }
    }

    if (paintWalls && paintWalls.checked) {
      const item = products.drywall_paint_items?.find(p => p.name === 'Paint - 2 Coats Walls');
      if (item) {
        total += item.price;
        drywallHtml += `<li>2 Coats Walls - $${item.price.toFixed(2)}</li>`;
        hasDrywall = true;
      }
    }

    if (paintTrim && paintTrim.checked) {
      const item = products.drywall_paint_items?.find(p => p.name === 'Paint - Trim');
      if (item) {
        total += item.price;
        drywallHtml += `<li>Trim Paint - $${item.price.toFixed(2)}</li>`;
        hasDrywall = true;
      }
    }

    if (paintCeiling && paintCeiling.checked) {
      const item = products.drywall_paint_items?.find(p => p.name === 'Paint - Ceiling');
      if (item) {
        total += item.price;
        drywallHtml += `<li>Ceiling - $${item.price.toFixed(2)}</li>`;
        hasDrywall = true;
      }
    }

    if (pointUpDrywall && pointUpDrywall.checked) {
      const item = products.drywall_paint_items?.find(p => p.name === 'Point Up Drywall');
      if (item) {
        total += item.price;
        drywallHtml += `<li>Point Up Drywall - $${item.price.toFixed(2)}</li>`;
        hasDrywall = true;
      }
    }

    drywallHtml += '</ul>';

    if (drywallNotes && drywallNotes.value.trim()) {
      drywallHtml += `<div style="margin-top: 6px; font-size: 13px; color: #6b7280;"><em>Notes: ${drywallNotes.value.trim()}</em></div>`;
    }

    drywallHtml += '</div>';
    if (hasDrywall) html += drywallHtml;
  }

  // Calculate Trim Section
  const trimCasingFt = document.getElementById('trim-casing-ft');
  const trimBaseboardFt = document.getElementById('trim-baseboard-ft');
  const trimQtrRoundFt = document.getElementById('trim-qtr-round-ft');
  const trimDoorsQty = document.getElementById('trim-doors-qty');
  const trimNotes = document.getElementById('trim-notes');

  let trimHtml = '';
  let hasTrim = false;

  if ((trimCasingFt && trimCasingFt.value) || (trimBaseboardFt && trimBaseboardFt.value) ||
    (trimQtrRoundFt && trimQtrRoundFt.value) || (trimDoorsQty && trimDoorsQty.value)) {
    trimHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Trim:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (trimCasingFt && trimCasingFt.value) {
      const qty = parseInt(trimCasingFt.value) || 0;
      if (qty > 0) {
        const item = products.trim_items?.find(p => p.name === 'Casing (per linear ft)');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          trimHtml += `<li>Casing: ${qty} linear ft - $${cost.toFixed(2)}</li>`;
          hasTrim = true;
        }
      }
    }

    if (trimBaseboardFt && trimBaseboardFt.value) {
      const qty = parseInt(trimBaseboardFt.value) || 0;
      if (qty > 0) {
        const item = products.trim_items?.find(p => p.name === 'Baseboard (per linear ft)');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          trimHtml += `<li>Baseboard: ${qty} linear ft - $${cost.toFixed(2)}</li>`;
          hasTrim = true;
        }
      }
    }

    if (trimQtrRoundFt && trimQtrRoundFt.value) {
      const qty = parseInt(trimQtrRoundFt.value) || 0;
      if (qty > 0) {
        const item = products.trim_items?.find(p => p.name === 'Qtr Round (per linear ft)');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          trimHtml += `<li>Qtr Round: ${qty} linear ft - $${cost.toFixed(2)}</li>`;
          hasTrim = true;
        }
      }
    }

    if (trimDoorsQty && trimDoorsQty.value) {
      const qty = parseInt(trimDoorsQty.value) || 0;
      if (qty > 0) {
        const item = products.trim_items?.find(p => p.name === 'Door');
        if (item) {
          const cost = item.price * qty;
          total += cost;
          trimHtml += `<li>Doors: ${qty} - $${cost.toFixed(2)}</li>`;
          hasTrim = true;
        }
      }
    }

    trimHtml += '</ul>';

    if (trimNotes && trimNotes.value.trim()) {
      trimHtml += `<div style="margin-top: 6px; font-size: 13px; color: #6b7280;"><em>Notes: ${trimNotes.value.trim()}</em></div>`;
    }

    trimHtml += '</div>';
    if (hasTrim) html += trimHtml;
  }

  // Calculate Flooring Section
  const flooringType = document.getElementById('flooring-type');
  const flooringSqft = document.getElementById('flooring-sqft');
  const flooringNotes = document.getElementById('flooring-notes');

  if ((flooringType && flooringType.value) || (flooringSqft && flooringSqft.value) || (flooringNotes && flooringNotes.value.trim())) {
    let flooringHtml = '<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;"><strong>Flooring:</strong><ul style="margin: 4px 0 0 0; padding-left: 20px;">';

    if (flooringType && flooringType.value) {
      const item = products.flooring_types?.find(p => p.id === flooringType.value);
      if (item) {
        flooringHtml += `<li>Type: ${item.name}</li>`;
      }
    }

    if (flooringSqft && flooringSqft.value) {
      const sqft = parseInt(flooringSqft.value) || 0;
      if (sqft > 0) {
        if (flooringType && flooringType.value) {
          const item = products.flooring_types?.find(p => p.id === flooringType.value);
          if (item && item.price > 0) {
            const cost = item.price * sqft;
            total += cost;
            flooringHtml += `<li>Square Footage: ${sqft} sq ft × $${item.price.toFixed(2)} = $${cost.toFixed(2)}</li>`;
          } else {
            flooringHtml += `<li>Square Footage: ${sqft} sq ft</li>`;
          }
        } else {
          flooringHtml += `<li>Square Footage: ${sqft} sq ft</li>`;
        }
      }
    }

    flooringHtml += '</ul>';

    if (flooringNotes && flooringNotes.value.trim()) {
      flooringHtml += `<div style="margin-top: 6px; font-size: 13px; color: #6b7280;"><em>Notes: ${flooringNotes.value.trim()}</em></div>`;
    }

    flooringHtml += '</div>';
    html += flooringHtml;
  }

  // Update other selections and build HTML
  Object.entries(fieldMapping).forEach(([id, config]) => {
    const el = document.getElementById(id);
    if (el) {
      const val = el.value;
      selections[config.key] = val ? el.options[el.selectedIndex].text : "";

      if (val) {
        // Try to estimate price if it's in the text (e.g. "+$100")
        const priceMatch = el.options[el.selectedIndex].text.match(/\(\+\$([0-9.]+)\)/);
        if (priceMatch) {
          total += parseFloat(priceMatch[1]);
        }

        html += `<div style="padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 6px;">
          <strong>${config.label}:</strong> ${el.options[el.selectedIndex].text}
        </div>`;
      }
    }
  });

  const summaryDiv = document.getElementById('summary');
  const totalDiv = document.getElementById('total');
  const emailBtn = document.getElementById('email-btn');

  if (html) {
    summaryDiv.innerHTML = html;
    totalDiv.innerHTML = `
      <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-top: 16px;">
        <div style="font-size: 14px; opacity: 0.9;">Total Estimate</div>
        <div style="font-size: 28px; font-weight: bold; margin-top: 4px;">$${total.toFixed(2)}</div>
      </div>
    `;
    if (emailBtn) emailBtn.disabled = false;
  } else {
    summaryDiv.innerHTML = '<p class="empty-message">Select items to see your estimate</p>';
    totalDiv.innerHTML = '';
    if (emailBtn) emailBtn.disabled = true;
  }
}

function getSelectedItem(selectId, items) {
  const select = document.getElementById(selectId);
  if (!select || !select.value) return null;
  return items?.find(item => item.id === select.value) || null;
}

export function generateEmailBody(selections) {
  let body = "";

  if (selections.scope_of_work) {
    body += `SCOPE: ${selections.scope_of_work}\n`;
  }

  if (selections.demo_items && selections.demo_items.length > 0) {
    body += `\nDEMO ITEMS:\n- ${selections.demo_items.join('\n- ')}\n`;
  }

  const fieldLabels = {
    'plumbing_color': 'Shower Pan Color',
    'plumbing_style': 'Faucet Style',
    'plumbing_type': 'Plumbing Type',
    'exhaust_fan': 'Exhaust Fan',
    'shower_size': 'Shower Size',
    'wall_type': 'Wall Surround Type',
    'vanity_length': 'Vanity Length',
    'flooring_type': 'Flooring Type'
  };

  let hasOther = false;
  Object.entries(fieldLabels).forEach(([key, label]) => {
    if (selections[key] && selections[key] !== "") {
      if (!hasOther) { body += "\nPRODUCT SELECTIONS:\n"; hasOther = true; }
      body += `${label}: ${selections[key]}\n`;
    }
  });

  return body;
}

function setupAdminControls() {
  // Legacy setup removed to prevent conflict with admin.js overlay

  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    logoutAdmin();
    alert('Logged out');
  });

  document.getElementById('admin-reset-btn')?.addEventListener('click', () => {
    if (confirm('⚠️ This will reset all dropdown data to defaults and clear any custom items you added. Continue?')) {
      localStorage.removeItem('bathroom_quote_products');
      alert('Data reset! Page will reload.');
      window.location.reload();
    }
  });
}

function showAdminPanel() {
  // Create admin overlay if it doesn't exist
  let overlay = document.getElementById('admin-overlay');
  if (!overlay) {
    overlay = createAdminOverlay();
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  renderAdminCategories();
}

function hideAdminPanel() {
  const overlay = document.getElementById('admin-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

function createAdminOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    overflow-y: auto;
    padding: 20px;
  `;

  overlay.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; padding: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb;">
        <h1 style="margin: 0; font-size: 1.8rem; color: #111827;">🔧 Admin Panel</h1>
        <button id="admin-close-btn" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px;">✕ Close</button>
      </div>
      
      <!-- Company Info Section -->
      <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px 0; color: #1e40af; font-size: 1.3rem;">🏢 Company Information</h2>
        <div style="display: grid; gap: 12px;">
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #374151;">Company Name:</label>
            <input type="text" id="admin-company-name" value="${company_info.name}" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #374151;">Address:</label>
            <input type="text" id="admin-company-address" value="${company_info.address}" placeholder="123 Main St, City, State ZIP" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #374151;">MHIC #:</label>
            <input type="text" id="admin-company-mhic" value="${company_info.mhic}" placeholder="Maryland Home Improvement Commission #" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #374151;">Phone:</label>
              <input type="tel" id="admin-company-phone" value="${company_info.phone}" placeholder="(555) 123-4567" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
            </div>
            <div>
              <label style="display: block; font-weight: 600; margin-bottom: 4px; color: #374151;">Email:</label>
              <input type="email" id="admin-company-email" value="${company_info.email}" placeholder="info@company.com" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
            </div>
          </div>
          <button id="save-company-info-btn" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 8px;">💾 Save Company Info</button>
        </div>
      </div>
      
      <div id="admin-categories-container"></div>
    </div>
  `;

  // Close button handler
  overlay.querySelector('#admin-close-btn').addEventListener('click', () => {
    hideAdminPanel();
  });

  // Save company info button handler
  overlay.querySelector('#save-company-info-btn').addEventListener('click', () => {
    company_info.name = document.getElementById('admin-company-name').value;
    company_info.address = document.getElementById('admin-company-address').value;
    company_info.mhic = document.getElementById('admin-company-mhic').value;
    company_info.phone = document.getElementById('admin-company-phone').value;
    company_info.email = document.getElementById('admin-company-email').value;

    // Save to localStorage
    localStorage.setItem('company_info', JSON.stringify(company_info));

    alert('✅ Company information saved successfully!');
  });

  // Close on overlay click (outside the panel)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      hideAdminPanel();
    }
  });

  return overlay;
}

function renderAdminCategories() {
  const container = document.getElementById('admin-categories-container');
  if (!container) return;

  const CATEGORIES = [
    { id: 'scope_of_work', name: 'Scope of Work', description: 'Editable: Main scope options (Tile Shower, Tub Conversion, etc.)' },
    { id: 'fixture_types', name: 'Fixture Types', description: 'Controls: FIXTURE TYPE dropdown' },
    { id: 'plumbing_colors', name: 'Plumbing Colors', description: 'Controls: TRIM COLOR dropdown' },
    { id: 'trim_colors', name: 'Options: Trim Colors', description: 'Controls: Options > TRIM COLOR dropdown' },
    { id: 'plumbing_styles', name: 'Plumbing Styles', description: 'Controls: TRIM STYLE dropdown' },
    { id: 'electrical_colors', name: 'Electrical Colors', description: 'Controls: Electrical color options' },
    { id: 'exhaust_fans', name: 'Exhaust Fans', description: 'Controls: EXHAUST FAN dropdown' },
    { id: 'accessories_finishes', name: 'Accessories Finishes', description: 'Controls: ACCESSORIES FINISH dropdown' },
    { id: 'shower_colors', name: 'Shower Colors', description: 'Controls: Shower COLOR dropdown' },
    { id: 'shower_sizes', name: 'Shower Sizes', description: 'Controls: Shower SIZE dropdown' },
    { id: 'drain_locations', name: 'Drain Locations', description: 'Controls: DRAIN LOCATION dropdown' },
    { id: 'tub_depths', name: 'Tub Depths', description: 'Controls: Bathtub DEPTH dropdown' },
    { id: 'tub_lengths', name: 'Tub Lengths', description: 'Controls: Bathtub LENGTH dropdown' },
    { id: 'wall_colors', name: 'Wall Colors', description: 'Controls: Walls COLOR dropdown' },
    { id: 'wall_patterns', name: 'Wall Patterns', description: 'Controls: Walls PATTERN dropdown' },
    { id: 'wall_types', name: 'Wall Types', description: 'Controls: Walls WALL TYPE dropdown' },
    { id: 'vanity_lengths', name: 'Vanity Lengths', description: 'Controls: Vanity LENGTH dropdown' },
    { id: 'flooring_types', name: 'Flooring Types', description: 'Controls: Flooring TYPE dropdown' },
    { id: 'trim_baseboard_styles', name: 'Baseboard Styles', description: 'Controls: Baseboard Style dropdown' },
    { id: 'trim_window_door_styles', name: 'Window/Door Trim Styles', description: 'Controls: Window/Door Trim Style dropdown' },
    { id: 'baseboard_styles', name: 'Baseboard Styles (Legacy)', description: 'Controls: BASEBOARD STYLE dropdown (Old)' },
    { id: 'window_styles', name: 'Window Styles', description: 'Controls: WINDOW STYLE dropdown' },
    { id: 'tile_materials', name: 'Tile Materials', description: 'Controls: Tile section checkboxes (22 items)' },
    { id: 'plumbing_materials', name: 'Plumbing Materials', description: 'Controls: Plumbing section checkboxes (20 items)' },
    { id: 'splash_options', name: 'Splash Options', description: 'Controls: Splash checkboxes (Cabinetry)' },
    { id: 'electrical_items', name: 'Electrical Items', description: 'Pricing: Switches, Outlets, Recessed Lights' },
    { id: 'accessory_items', name: 'Accessory Items', description: 'Pricing: Towel Bars, Rings, TP Holders' },
    { id: 'drywall_paint_items', name: 'Drywall & Paint Items', description: 'Pricing: Drywall, Sheets, Paint options' },
    { id: 'trim_items', name: 'Trim Items', description: 'Pricing: Casing, Baseboard, Qtr Round, Doors' },
    { id: 'grab_bar_sizes', name: 'Grab Bar Sizes', description: 'Pricing: 16" and 24" grab bars' },
    { id: 'shelf_types', name: 'Shelf Types', description: 'Pricing: Single and Double shelves' },
    { id: 'shower_door_styles', name: 'Shower Door Styles', description: 'Controls: Shower Door STYLE dropdown' },
    { id: 'shower_door_thickness', name: 'Shower Door Thickness', description: 'Controls: Shower Door THICKNESS dropdown' },
    { id: 'shower_door_glass_types', name: 'Shower Door Glass Types', description: 'Controls: Shower Door GLASS TYPE dropdown' }
  ];

  container.innerHTML = CATEGORIES.map(cat => renderCategory(cat)).join('');

  // Attach event listeners for all categories
  CATEGORIES.forEach(cat => {
    setupCategoryHandlers(cat.id);
  });
}

function renderCategory(cat) {
  const items = products[cat.id] || [];
  const itemsHTML = items.length === 0
    ? '<p style="color: #6b7280; font-size: 14px;">No items in this category.</p>'
    : items.map(item => `
        <div class="admin-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f9fafb; border-radius: 6px; margin-bottom: 8px;">
          <div style="flex: 1;">
            <strong>${item.name}</strong>
            <span style="color: #6b7280; margin-left: 8px;">$${parseFloat(item.price).toFixed(2)}</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="admin-edit-btn" data-category="${cat.id}" data-id="${item.id}" style="background: #3b82f6; color: white; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">EDIT</button>
            <button class="admin-delete-btn" data-category="${cat.id}" data-id="${item.id}" style="background: #ef4444; color: white; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
          </div>
        </div>
      `).join('');

  return `
    <div style="margin-bottom: 32px; padding: 20px; background: #f9fafb; border-radius: 12px;">
      <h2 style="margin: 0 0 4px; font-size: 1.3rem; color: #111827;">${cat.name}</h2>
      <p style="margin: 0 0 16px; font-size: 13px; color: #6b7280; font-style: italic;">${cat.description || ''}</p>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <input type="text" id="add-name-${cat.id}" placeholder="Item Name" style="flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
        <input type="number" id="add-price-${cat.id}" placeholder="Price" step="0.01" style="width: 120px; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px;">
        <button class="admin-add-btn" data-category="${cat.id}" style="background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600;">ADD</button>
      </div>
      <div id="list-${cat.id}">
        ${itemsHTML}
      </div>
    </div>
  `;
}

function setupCategoryHandlers(categoryId) {
  // Add button handler
  const addBtn = document.querySelector(`.admin-add-btn[data-category="${categoryId}"]`);
  if (addBtn) {
    addBtn.addEventListener('click', async () => {
      const nameInput = document.getElementById(`add-name-${categoryId}`);
      const priceInput = document.getElementById(`add-price-${categoryId}`);
      const name = nameInput.value.trim();
      const price = parseFloat(priceInput.value);

      if (!name || isNaN(price)) {
        alert('Please enter a valid name and price.');
        return;
      }

      try {
        await addItem(categoryId, name, price);
        nameInput.value = '';
        priceInput.value = '';
        renderAdminCategories();
        populateDropdowns(); // Update dropdowns in main form
      } catch (err) {
        console.error(err);
        alert('Error adding item. Check console for details.');
      }
    });
  }

  // Edit button handlers
  document.querySelectorAll(`.admin-edit-btn[data-category="${categoryId}"]`).forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.id;
      const item = products[categoryId]?.find(p => p.id === itemId);
      if (!item) return;

      const newName = prompt('Enter new name:', item.name);
      if (!newName) return;

      const newPrice = prompt('Enter new price:', item.price);
      if (newPrice === null) return;

      const price = parseFloat(newPrice);
      if (isNaN(price)) {
        alert('Invalid price');
        return;
      }

      try {
        await deleteItem(categoryId, itemId);
        await addItem(categoryId, newName, price);
        renderAdminCategories();
        populateDropdowns();
      } catch (err) {
        console.error(err);
        alert('Error updating item.');
      }
    });
  });

  // Delete button handlers
  document.querySelectorAll(`.admin-delete-btn[data-category="${categoryId}"]`).forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.id;
      const item = products[categoryId]?.find(p => p.id === itemId);

      if (!confirm(`Delete "${item?.name}"?`)) return;

      try {
        await deleteItem(categoryId, itemId);
        renderAdminCategories();
        populateDropdowns();
        updateSummary();
      } catch (err) {
        console.error(err);
        alert('Error deleting item.');
      }
    });
  });
}
// Dynamic Admin Controls - Append to end of app.js

// Dynamically inject admin controls to all dropdowns
function injectAdminControlsToAllDropdowns() {
  console.log('Injecting admin controls to all dropdowns...');
  console.log('DROPDOWN_MAPPINGS:', DROPDOWN_MAPPINGS);

  Object.entries(DROPDOWN_MAPPINGS).forEach(([selectId, category]) => {
    console.log(`Looking for dropdown: ${selectId}`);
    const select = document.getElementById(selectId);

    if (!select) {
      console.warn(`Dropdown not found: ${selectId}`);
      return;
    }

    console.log(`Found dropdown: ${selectId}, parent:`, select.parentElement);

    // Check if admin controls already exist
    const existingControls = select.parentElement.querySelector('.dynamic-admin-controls');
    if (existingControls) {
      console.log(`Admin controls already exist for ${selectId}`);
      return;
    }

    console.log(`Creating admin controls for ${selectId}`);

    // Create admin controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'dynamic-admin-controls admin-control';
    controlsDiv.style.cssText = 'margin-top: 8px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bfdbfe;';

    controlsDiv.innerHTML = `
      <input type="text" placeholder="Item name" class="admin-name-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <input type="number" placeholder="Price" step="0.01" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary admin-add-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
        <button class="btn btn-secondary admin-edit-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">✏️ Edit</button>
        <button class="btn btn-secondary admin-delete-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete</button>
        <button class="btn btn-secondary admin-cancel-btn" style="display: none; flex: 1; padding: 6px 12px; font-size: 12px; background: #6b7280;">❌ Cancel</button>
      </div>
    `;

    select.parentElement.appendChild(controlsDiv);
    console.log(`Admin controls added for ${selectId}`);

    // Setup event listeners
    setupDynamicAdminControls(selectId, category, controlsDiv);
  });

  console.log('Admin control injection complete');

  // Also inject checkbox controls
  injectAdminControlsToCheckboxes();
}

function injectAdminControlsToCheckboxes() {
  console.log('Injecting admin controls to checkboxes...');

  // 1. Tile Materials
  const tileSection = document.getElementById('tile-notes')?.closest('.section-content');
  if (tileSection) {
    const container = tileSection.querySelector('div[style*="grid-template-columns"]');
    if (container && !container.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
      const controlsDiv = createCheckboxAdminControls('tile_materials');
      container.parentNode.insertBefore(controlsDiv, container.nextElementSibling);
      setupDynamicAdminControlsForCheckboxes('tile_materials', controlsDiv);
    }
  }

  // 2. Plumbing Materials
  const plumbingSection = document.getElementById('plumbing-notes')?.closest('.section-content');
  if (plumbingSection) {
    const container = plumbingSection.querySelector('div[style*="grid-template-columns"]');
    if (container && !container.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
      const controlsDiv = createCheckboxAdminControls('plumbing_materials');
      container.parentNode.insertBefore(controlsDiv, container.nextElementSibling);
      setupDynamicAdminControlsForCheckboxes('plumbing_materials', controlsDiv);
    }
  }

  // 3. Splash Options (Cabinetry)
  const splashContainer = document.getElementById('splash-options');
  if (splashContainer && !splashContainer.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
    const controlsDiv = createCheckboxAdminControls('splash_options');
    splashContainer.parentNode.insertBefore(controlsDiv, splashContainer.nextElementSibling);
    setupDynamicAdminControlsForCheckboxes('splash_options', controlsDiv);
  }

  // 4. Scope of Work
  const scopeContainer = document.getElementById('scope-of-work-checkboxes');
  if (scopeContainer && !scopeContainer.nextElementSibling?.classList.contains('dynamic-admin-controls')) {
    const controlsDiv = createCheckboxAdminControls('scope_of_work');
    scopeContainer.parentNode.insertBefore(controlsDiv, scopeContainer.nextElementSibling);
    setupDynamicAdminControlsForCheckboxes('scope_of_work', controlsDiv);
  }
}

function createCheckboxAdminControls(category) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'dynamic-admin-controls admin-control';
  controlsDiv.style.cssText = 'margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;';

  controlsDiv.innerHTML = `
    <div style="font-size: 13px; font-weight: 600; color: #1e40af; margin-bottom: 8px;">Edit Selected Item:</div>
    <input type="text" placeholder="Item name" class="admin-name-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
    <input type="number" placeholder="Price" step="0.01" class="admin-price-input" style="width: 100%; padding: 6px; margin-bottom: 6px; border: 1px solid #e5e7eb; border-radius: 4px;">
    <div style="display: flex; gap: 8px;">
      <button class="btn btn-primary admin-add-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">➕ Add</button>
      <button class="btn btn-secondary admin-edit-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">✏️ Edit</button>
      <button class="btn btn-secondary admin-delete-btn" style="flex: 1; padding: 6px 12px; font-size: 12px;">🗑️ Delete</button>
      <button class="btn btn-secondary admin-cancel-btn" style="display: none; flex: 1; padding: 6px 12px; font-size: 12px; background: #6b7280;">❌ Cancel</button>
    </div>
    <div style="font-size: 11px; color: #6b7280; margin-top: 6px; font-style: italic;">* Select a checkbox above to populate fields</div>
  `;

  return controlsDiv;
}

function setupDynamicAdminControlsForCheckboxes(category, controlsDiv) {
  const nameInput = controlsDiv.querySelector('.admin-name-input');
  const priceInput = controlsDiv.querySelector('.admin-price-input');
  const addBtn = controlsDiv.querySelector('.admin-add-btn');
  const editBtn = controlsDiv.querySelector('.admin-edit-btn');
  const deleteBtn = controlsDiv.querySelector('.admin-delete-btn');
  const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');

  // Find the container of checkboxes
  let checkboxContainer;
  if (category === 'splash_options') {
    checkboxContainer = document.getElementById('splash-options');
  } else if (category === 'tile_materials') {
    checkboxContainer = document.getElementById('tile-notes').closest('.section-content').querySelector('div[style*="grid-template-columns"]');
  } else if (category === 'plumbing_materials') {
    checkboxContainer = document.getElementById('plumbing-notes').closest('.section-content').querySelector('div[style*="grid-template-columns"]');
  } else if (category === 'scope_of_work') {
    checkboxContainer = document.getElementById('scope-of-work-checkboxes');
  }

  // Add click listener to checkboxes to populate form
  if (checkboxContainer) {
    checkboxContainer.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && document.body.classList.contains('admin-mode')) {
        // Uncheck others to focus on one edit at a time (visual only for admin convenience)
        // checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        //   if (cb !== e.target) cb.checked = false;
        // });

        const itemName = e.target.value; // Scope uses value as name usually, let's check
        // For Scope of Work, value IS the name. For others, value is ID.
        // We need to handle this distinction.
        let item;

        if (category === 'scope_of_work') {
          // For scope of work, we rely on finding by name since ID isn't used in value
          // Value has &quot; replaced back to "
          const decodedName = itemName.replace(/&quot;/g, '"');
          item = products[category]?.find(p => p.name === decodedName);
        } else {
          const itemId = e.target.value;
          item = products[category]?.find(p => String(p.id) === String(itemId));
        }

        if (item) {
          nameInput.value = item.name;
          priceInput.value = item.price;

          addBtn.textContent = '✅ Update';
          addBtn.dataset.editingId = item.id; // Always use ID for updates
          cancelBtn.style.display = 'block';

          // Highlight the selected item row
          // e.target.closest('label').style.background = '#dbeafe';
        }
      }
    });
  }

  // Reuse the logic from setupDynamicAdminControls - but adapted for this context

  // Add/Update Button
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;

    if (!name) {
      alert('Please enter an item name');
      return;
    }

    if (addBtn.dataset.editingId) {
      // Update
      await editItem(category, addBtn.dataset.editingId, name, price);
      // Reset UI
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      cancelBtn.style.display = 'none';
      alert(`Updated "${name}"`);
    } else {
      // Add
      await addItem(category, name, price);
      alert(`Added "${name}"`);
    }

    nameInput.value = '';
    priceInput.value = '';

    // Refresh UI
    if (category === 'splash_options') {
      // Re-render splash options
      const container = document.getElementById('splash-options');
      container.innerHTML = products.splash_options.map(item => `
        <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
          <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
          <span>${item.name}</span>
          <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
        </label>
      `).join('');
    } else if (category === 'scope_of_work') {
      populateScopeOfWork();
    } else {
      // Re-render the app to update checkbox lists
      // Ideally we'd just re-render the section, but re-init is safer to ensure consistency
      // But re-init closes admin... let's try to just re-render the specific section HTML

      if (category === 'tile_materials') {
        checkboxContainer.innerHTML = products.tile_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      } else if (category === 'plumbing_materials') {
        checkboxContainer.innerHTML = products.plumbing_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      }
    }

    // Re-attach listeners just in case
    setupListeners();
  });

  // Edit Button (manual triggering)
  editBtn.addEventListener('click', () => {
    // If user manually clicks edit without selecting a checkbox, prompt them
    if (!addBtn.dataset.editingId) {
      alert('Please select a checkbox item above to edit it.');
    }
  });

  // Delete Button
  deleteBtn.addEventListener('click', async () => {
    if (!addBtn.dataset.editingId) {
      alert('Please select a checkbox item above to delete it.');
      return;
    }

    const itemId = addBtn.dataset.editingId;
    const item = products[category]?.find(p => String(p.id) === String(itemId));

    if (confirm(`Delete "${item?.name}"?`)) {
      await deleteItem(category, itemId);

      // Clear form
      nameInput.value = '';
      priceInput.value = '';
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      cancelBtn.style.display = 'none';

      // Refresh UI (COPY PASTE from above - could be refactored)
      if (category === 'splash_options') {
        const container = document.getElementById('splash-options');
        container.innerHTML = products.splash_options.map(item => `
          <label style="display: flex; align-items: center; gap: 6px; font-weight: normal;">
            <input type="checkbox" class="splash-option" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px;">
            <span>${item.name}</span>
            <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
          </label>
        `).join('');
      } else if (category === 'scope_of_work') {
        populateScopeOfWork();
      } else if (category === 'tile_materials') {
        checkboxContainer.innerHTML = products.tile_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="tile-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="tile-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      } else if (category === 'plumbing_materials') {
        checkboxContainer.innerHTML = products.plumbing_materials.map(item => `
          <label style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f9fafb; border-radius: 6px; cursor: pointer;">
            <input type="checkbox" class="plumbing-item" value="${item.id}" data-name="${item.name}" style="width: 18px; height: 18px; flex-shrink: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px;">${item.name}</span>
              <span style="font-size: 12px; color: #6b7280;">$${item.price.toFixed(2)}</span>
            </div>
            <input type="number" class="plumbing-qty" data-item="${item.id}" min="0" placeholder="Qty" style="width: 60px; padding: 4px 6px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 13px;">
          </label>
        `).join('');
      }

      setupListeners();
      alert(`Deleted "${item.name}"`);
    }
  });


  // Cancel Button
  cancelBtn.addEventListener('click', () => {
    nameInput.value = '';
    priceInput.value = '';
    addBtn.textContent = '➕ Add';
    delete addBtn.dataset.editingId;
    cancelBtn.style.display = 'none';
  });
}

function setupDynamicAdminControls(selectId, category, controlsDiv) {
  const select = document.getElementById(selectId);
  const nameInput = controlsDiv.querySelector('.admin-name-input');
  const priceInput = controlsDiv.querySelector('.admin-price-input');
  const addBtn = controlsDiv.querySelector('.admin-add-btn');
  const editBtn = controlsDiv.querySelector('.admin-edit-btn');
  const deleteBtn = controlsDiv.querySelector('.admin-delete-btn');

  // Add button (handles both Add and Update)
  addBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;

    if (!name) {
      alert('Please enter an item name');
      return;
    }

    // Check if we're in edit mode
    if (addBtn.dataset.editingId) {
      // Update existing item
      await editItem(category, addBtn.dataset.editingId, name, price);
      delete addBtn.dataset.editingId;
      delete addBtn.dataset.editingCategory;
      addBtn.textContent = '➕ Add';
      alert(`Updated "${name}"`);
    } else {
      // Add new item
      await addItem(category, name, price);
      alert(`Added "${name}"`);
    }

    nameInput.value = '';
    priceInput.value = '';
    populateDropdowns();
    updateSummary();
  });

  // Edit button
  editBtn.addEventListener('click', async () => {
    const selectedId = select.value;
    if (!selectedId) {
      alert('Please select an item to edit');
      return;
    }

    console.log('Edit clicked - Category:', category, 'Selected ID:', selectedId);
    console.log('Available items:', products[category]);

    const item = products[category]?.find(p => String(p.id) === String(selectedId));
    if (!item) {
      console.error('Item not found! Looking for ID:', selectedId, 'in', products[category]);
      alert(`Item not found. ID: ${selectedId}`);
      return;
    }

    console.log('Found item:', item);

    // Pre-fill inputs
    nameInput.value = item.name;
    priceInput.value = item.price;

    // Change Add button to Update and store the selected ID
    addBtn.textContent = '✅ Update';
    addBtn.dataset.editingId = selectedId;
    addBtn.dataset.editingCategory = category;

    // Show Cancel button
    const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');
    if (cancelBtn) cancelBtn.style.display = 'block';
  });

  // Delete button
  deleteBtn.addEventListener('click', async () => {
    const selectedId = select.value;
    if (!selectedId) {
      alert('Please select an item to delete');
      return;
    }

    const item = products[category]?.find(p => p.id === selectedId);
    if (item && confirm(`Delete "${item.name}"?`)) {
      await deleteItem(category, selectedId);
      populateDropdowns();
      updateSummary();
      alert(`Deleted "${item.name}"`);
    }
  });

  // Cancel button
  const cancelBtn = controlsDiv.querySelector('.admin-cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      // Clear inputs
      nameInput.value = '';
      priceInput.value = '';

      // Reset Add button
      addBtn.textContent = '➕ Add';
      delete addBtn.dataset.editingId;
      delete addBtn.dataset.editingCategory;

      // Hide Cancel button
      cancelBtn.style.display = 'none';
    });
  }
}

export async function editItem(category, id, name, price) {
  if (!products[category]) return;
  const item = products[category].find(p => p.id === id);
  if (item) {
    item.name = name;
    item.price = parseFloat(price);
    saveProductsToStorage();
  }
}

