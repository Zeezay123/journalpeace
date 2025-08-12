import mongoose from 'mongoose';
import SiteSettings from './models/siteSettings.model.js'; // adjust path if needed

const uri = 'your_mongodb_connection_string_here';

async function seedSettings() {
  try {
    await mongoose.connect(uri);

    const existing = await SiteSettings.findOne();
    if (existing) {
      console.log('SiteSettings already exists. Skipping seed.');
      return;
    }

    const defaultSettings = new SiteSettings({
      about: {
        title: 'About Us',
        subtitle: 'Who we are',
        intro: 'Welcome to our company...',
        mission: 'Our mission is...',
        vision: 'Our vision is...',
        philosophy: 'Our philosophy is...',
        vcMessage: 'Message from VC...',
        directorMessage: 'Message from Director...',
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
      },
      homepage: {
        title: 'Welcome to Our Site',
        subtitle: 'Your success starts here',
        intro: 'Homepage intro text here...'
      },
      howToApplyOne: {
        title: 'Step One',
        subtitle: 'Register your account'
      },
      howToApplyTwo: {
        title: 'Step Two',
        subtitle: 'Submit your documents'
      },
      howToApplyThree: {
        title: 'Step Three',
        subtitle: 'Wait for approval'
      },
      programmes: {
        title: 'Our Programmes',
        subtitle: 'Explore opportunities',
        introTitle: 'Programme Highlights',
        introSubtitle: 'Learn more about our courses'
      },
      blog: {
        title: 'Latest News',
        subtitle: 'Stay updated'
      },
      callToAction: {
        title: 'Get Started Now',
        subtitle: 'Join us today!'
      }
    });

    await defaultSettings.save();
    console.log('Default SiteSettings created successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding SiteSettings:', error);
  }
}

seedSettings();
