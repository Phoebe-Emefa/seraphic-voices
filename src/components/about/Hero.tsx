import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

// Simple function to render portable text content
const renderPortableText = (content: any) => {
  if (!content || !Array.isArray(content)) return null;
  
  return content.map((block: any, index: number) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.map((child: any) => {
        let textContent = child.text || '';
        
        // Apply marks (bold, italic, etc.)
        if (child.marks && Array.isArray(child.marks)) {
          child.marks.forEach((mark: string) => {
            switch (mark) {
              case 'strong':
                textContent = `<strong>${textContent}</strong>`;
                break;
              case 'em':
                textContent = `<em>${textContent}</em>`;
                break;
              case 'underline':
                textContent = `<u>${textContent}</u>`;
                break;
            }
          });
        }
        
        return textContent;
      }).join('');
      
      // Apply block styles
      switch (block.style) {
        case 'h1':
          return <Text key={index} as="h1" fontSize="2xl" mb={4} fontWeight="bold" color="white">{text}</Text>;
        case 'h2':
          return <Text key={index} as="h2" fontSize="xl" mb={3} fontWeight="bold" color="white">{text}</Text>;
        case 'h3':
          return <Text key={index} as="h3" fontSize="lg" mb={2} fontWeight="bold" color="white">{text}</Text>;
        case 'blockquote':
          return <Text key={index} as="blockquote" borderLeft="4px solid" borderLeftColor="primary.300" pl={4} my={4} fontStyle="italic" color="white">{text}</Text>;
        default:
          return <Text key={index} mb={2} color="white" dangerouslySetInnerHTML={{ __html: text }} />;
      }
    }
    return null;
  }).filter(Boolean);
};

const Hero = ({
  heading,
  description,
  image,
  alt
}: {
  heading: string;
  description: string | any;
  image: string;
  alt?: string
}) => {
  return (
    <Box
      width="full"
      height={{ base: "100%", xl: "28rem" }}
      position="relative"
    >
        <Image
          src={image}
          alt={alt || "The seraphic voices"}
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
        />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        background="rgba(0, 0, 0, 0.8)"
        rounded="lg"
        color="white"
        padding={{ base: "16px", md: "24px" }}
        width={{ base: "95%", md: "70%", lg: "60%" }}
        maxH={{ base: "80%", md: "70%" }}
        overflowY="auto"
        boxShadow="xl"
      >
        <Heading
          as="h4"
          fontSize={{ base: "3xl", xl: "4xl" }}
          color="white"
          fontWeight="bold"
        >
          {heading}
        </Heading>
        <Box 
          fontWeight="semibold" 
          fontSize={{ base: "md", md: "lg" }} 
          mt={3} 
          textAlign="left" 
          maxH="150px" 
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255,255,255,0.5)',
            },
          }}
        >
          {Array.isArray(description) ? renderPortableText(description) : <Text color="white">{description}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
